package br.com.mba.engenharia.de.software.dto;

import br.com.mba.engenharia.de.software.entity.usuarios.Usuario;
import lombok.Getter;

@Getter
public class UsuarioDTO {
    private String username;
    private String senha;
    private String email;
    private String token;
    private String nome;
    private String sobrenome;
    private String cpf;
    private String status;

    public Usuario parseUsuarioDTOToUsuario(){
        return new Usuario(this.username, this.email, this.nome, this.sobrenome);
    }

    public Usuario parseUsuarioDTOToUsuarioFromDesbloqueio(){
        return new Usuario(this.username, this.token);
    }

}
