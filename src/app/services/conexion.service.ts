import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators/map';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
//si tuviera mas campos como descripcion y demas, se debe agregar aqui en la interface

export interface Item {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class ConexionService {
  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  private itemDoc: AngularFirestoreDocument<Item>;

  //afs es AngularFirestore
  constructor(private afs: AngularFirestore) {
    //el 'items' es el nombre de la coleccion que se configuro en la pagina de firebase
    this.itemsCollection = afs.collection<Item>('items');
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Item;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  listaItem() {
    return this.items;
  }

  agregarItem(item: Item) {
    this.itemsCollection.add(item);
  }

  eliminarItem(item) {
    // recibe un item de lista.component.ts guardamos especificamente el item que tene cierto id
    
    this.itemDoc = this.afs.doc<Item>(`items/${item.id}`);
    this.itemDoc.delete();

  }
}
