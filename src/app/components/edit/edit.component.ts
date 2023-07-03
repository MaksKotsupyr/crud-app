import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/interfaces/item.interface';
import { GetLocalStorageDataService } from 'src/app/services/get-local-storage-data.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  itemForm!: FormGroup;
  item!: Item[];
  id = Number(this.route.snapshot.paramMap.get('id'));
  listItems: Item[] = [];
  validInput: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private getLocalStorageDataService: GetLocalStorageDataService,
    private fb: FormBuilder,
    private storage: Storage
  ) {
    this.storage = window.localStorage;
  }

  ngOnInit() {
    this.getItem();
  }

  getItem(): void {

    this.getLocalStorageDataService.getItem(this.id).subscribe(item => {
      this.item = item;

    })
    this.itemForm = this.fb.group({
      title: [this.item[0].title, Validators.compose([
        Validators.required
      ])],
      description: [this.item[0].description, Validators.compose([
        Validators.required
      ])],
      detail: [this.item[0].detail, Validators.compose([
        Validators.required
      ])]
    });
  }

  onInput(value: string): void {
    const regex = /[a-zA-Z\ ]/;
      for (let i = 0; i < value.length; i++){
        if(!value[i].match(regex)) {
          this.validInput = true;
          
        }else {
            this.validInput = false;
        }
      }
  }


  editItem(): void {
    if (this.itemForm.valid) {
      const submitFormData: Item = {
        ...this.itemForm.value
      }
      this.getLocalStorageDataService.editItem(this.id, submitFormData).subscribe(data => {
        try {
          this.listItems = data;
          this.storage.setItem('items', JSON.stringify(this.listItems))
        } catch (err) {
          console.log(err);
        }
      })

      this.itemForm.reset({
        title: [submitFormData.title],
        description: [submitFormData.description],
        detail: [submitFormData.detail]
      })
    }
  }
}
