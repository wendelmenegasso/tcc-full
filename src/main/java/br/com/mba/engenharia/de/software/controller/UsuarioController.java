package br.com.mba.engenharia.de.software.controller;

import br.com.mba.engenharia.de.software.dto.usuarios.UsuarioDTO;
import br.com.mba.engenharia.de.software.dto.usuarios.UsuarioDTORetorno;
import br.com.mba.engenharia.de.software.entity.usuarios.Usuario;
import br.com.mba.engenharia.de.software.output.SenderMail;
import br.com.mba.engenharia.de.software.repository.usuario.UsuarioRepositoryNovo;
import br.com.mba.engenharia.de.software.security.ComplexidadeSenha;
import br.com.mba.engenharia.de.software.security.Criptrografia;
import br.com.mba.engenharia.de.software.security.GerarToken;
import br.com.mba.engenharia.de.software.service.usuarios.UserManager;
import br.com.mba.engenharia.de.software.service.usuarios.UserService;
import br.com.mba.engenharia.de.software.utils.ValidadorCPF;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@CrossOrigin(origins = "*")
public class UsuarioController{
    private static final Logger logger = LoggerFactory.getLogger(Usuario.class);

    @Autowired
    UsuarioRepositoryNovo usuarioRepositoryNovo;

    UserService userService = userService();

    @Bean
    public UserService userService(){
        UserManager userManager = new UserManager(usuarioRepositoryNovo);
        return userManager;
    }

    public UsuarioController() {
        this.userService = userService();
    }

    @PostMapping("/enviarCadastro")
    public ResponseEntity<?> enviarCadastro(@RequestBody UsuarioDTO usuarioDTO) throws IOException {
        GerarToken gerarToken = new GerarToken();
        if (!usuarioDTO.getSenha().equals(usuarioDTO.getSenha2())){
            UsuarioDTORetorno usuarioDTORetorno = new UsuarioDTORetorno();
            usuarioDTORetorno.setRetorno("Senhas diferentes!");
            return new ResponseEntity<>(usuarioDTORetorno, HttpStatus.OK);
        }
        Usuario usuario = usuarioDTO.parseUsuarioDTOToUsuario();
        ValidadorCPF validadorCPF = new ValidadorCPF();
        if (validadorCPF.isValid(usuarioDTO.getCpf())){
            usuario.setCPF(usuarioDTO.getCpf());
        }
        else {
            return ResponseEntity.badRequest().build();
        }
        Criptrografia criptrografia = new Criptrografia();
        ComplexidadeSenha  complexidadeSenha = new ComplexidadeSenha();
        if (complexidadeSenha.isStronger(usuarioDTO.getSenha())){
            usuario.setSenha(criptrografia.criptografar(usuarioDTO.getSenha()));
        }
        else {
            return ResponseEntity.badRequest().build();
        }
        usuario.setToken(gerarToken.gerarToken());
        usuario.setStatus("0");
        userService.setRepository(usuarioRepositoryNovo);
        usuario.setId(userService.count());
        Usuario usuarioRetorno = userService.save(usuario);
        UsuarioDTORetorno usuarioDTORetorno = usuarioRetorno.parseUsuarioToUsuarioDTORetorno();
            if (SenderMail.sendEmail(usuario)){
                logger.info(String.format("Usuário cadastrado corretamente!"));
                logger.info(String.format("Token enviado com sucesso!"));
                return new ResponseEntity<>(usuarioDTORetorno, HttpStatus.CREATED);
            }
            else {
                logger.error(String.format("Erro no envio do e-mail"));
                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
            }
    }

    @PostMapping("/habilitarUsuario")
    public ResponseEntity<?>  habiblitarUsuario(@RequestBody UsuarioDTO usuarioDTO) throws IOException, InstantiationException, IllegalAccessException {
        Usuario user = usuarioDTO.parseUsuarioDTOToUsuarioFromDesbloqueio();
        user.setCPF(usuarioDTO.getCpf());
        Criptrografia criptrografia = new Criptrografia();
        user.setSenha(criptrografia.criptografar(usuarioDTO.getSenha()));
        userService.setRepository(usuarioRepositoryNovo);
        Usuario usuarioRetorno = userService.findByTokenUsernameAndSenha(user.getToken(), user.getUsername(), "0", user.getSenha());
        Integer retorno = userService.findByTokenUsernameSenhaAndStatusAndUpdateStatus(usuarioRetorno.getToken(),
                usuarioRetorno.getUsername(), usuarioRetorno.getSenha(), "0");
        UsuarioDTORetorno usuarioDTORetorno = usuarioRetorno.parseUsuarioToUsuarioDTORetorno();
        if (retorno > 0){
            return new ResponseEntity<>(usuarioDTORetorno, HttpStatus.CREATED);
        }
        else{
            return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
        }
    }
}

