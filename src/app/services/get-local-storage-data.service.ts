import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Item } from '../interfaces/item.interface';

@Injectable({
  providedIn: 'root'
})
export class GetLocalStorageDataService {
  
  constructor(private storage: Storage) {
    this.storage = window.localStorage;

   }

  getItems(): Observable<Item[]> {
    const items = this.storage.getItem('items');
    return of(items ? JSON.parse(items) : null);
  };

  getItem(itemID: number): Observable<Item[]> {
    const items = this.storage.getItem('items');
    const itemsObj = (items ? JSON.parse(items) : null)

    const detailedItem = itemsObj.filter((item: Item, index: number) => itemsObj[itemID] === itemsObj[index])

    return of(detailedItem)
  }

  deleteItem(itemID: number): Observable<Item[]> {
    const noUpdatedItemsString = this.storage.getItem('items');
    const noUpdatedItemsObject = noUpdatedItemsString ? JSON.parse(noUpdatedItemsString) : null;

    const UpdatedItemsObject = noUpdatedItemsObject.filter((obj: any, index: any) => {
      return index !== itemID;
    })

    this.storage.setItem('items', JSON.stringify(UpdatedItemsObject));

    return of(UpdatedItemsObject);
  }

  editItem(itemID: number, updateData: Item): Observable<Item[]> {
    const items = this.storage.getItem('items');
    const itemsObj = (items ? JSON.parse(items) : null);

    itemsObj.splice(itemID, 1, updateData);
    
    return of(itemsObj)
  }

  createItem(data: Item): Observable<Item[]> {
    const items = this.storage.getItem('items');
    const itemsObj = (items ? JSON.parse(items) : null)
    console.log(data,itemsObj, itemsObj.length);
    itemsObj.splice(itemsObj.length, 1, data);
    return of(itemsObj)
  }
}


