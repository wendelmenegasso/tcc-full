import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserService } from './service/user.service';
import { MenuComponent } from './menu/menu.component';
import { FalhaDeLoginComponent } from './falha-de-login/falha-de-login.component';
import { MasterComponent } from './master/master.component';
import { NgbdAccordionConfig } from './accordion-config/accordion-config.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CriarUsuarioComponent } from './criar-usuario/criar-usuario.component';
import { UsuarioService } from './service/usuario-service.service';
import { DesbloquearUsuarioComponent } from './desbloquear-usuario/desbloquear-usuario.component';
import { ContasBancariasComponent } from './contas-bancarias/contas-bancarias.component';
import { ContasBancariasService } from './service/contas-bancarias.service';
import { ContasComponent } from './contas/contas.component';
import { InserirContasModalComponent } from './inserir-contas-modal/inserir-contas-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserFormComponent,
    MenuComponent,
    FalhaDeLoginComponent,
    MasterComponent,
    NgbdAccordionConfig,
    CriarUsuarioComponent,
    DesbloquearUsuarioComponent,
    ContasBancariasComponent,
    ContasComponent,
    InserirContasModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule
  ],
  providers: [UserService,UsuarioService,ContasBancariasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
