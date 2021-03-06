import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// FIREBASE
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
// SERVICIOS
import { ConexionService } from './services/conexion.service';
// COMPONENTES
import { AppComponent } from './app.component';
import { ListaComponent } from './components/lista/lista.component';
import { ListaAddComponent } from './components/lista-add/lista-add.component';

@NgModule({
  declarations: [AppComponent, ListaComponent, ListaAddComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    FormsModule,
  ],
  providers: [ConexionService],
  bootstrap: [AppComponent],
})
export class AppModule {}
