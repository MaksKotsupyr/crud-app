import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/interfaces/item.interface';
import { GetLocalStorageDataService } from 'src/app/services/get-local-storage-data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  validInput: boolean = true;
  itemFormCreate!: FormGroup;

  constructor(
    private getLocalStorageDataService: GetLocalStorageDataService,
    private fb: FormBuilder,
    private storage: Storage,
    private router: Router
  ) { 
    this.storage = window.localStorage;

  }

  ngOnInit() {
    this.itemFormCreate = this.fb.group({
      title: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
      description: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])],
      detail: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])]
    });
  }

  onInput(value: string): void {
    const regex = /[a-zA-Z\ ]/;
    for (let i = 0; i < value.length; i++) {
      if (!value[i].match(regex)) {
        this.validInput = true;

      } else {
        this.validInput = false;
      }
    }
  }

  createItem() {
    if (this.itemFormCreate.valid) {
      const submitFormData: Item = {
        ...this.itemFormCreate.value
      }

      this.getLocalStorageDataService.createItem(submitFormData).subscribe(data => {
        this.storage.setItem('items', JSON.stringify(data))
      })

      this.itemFormCreate.reset({
        title: '',
        description: '',
        detail: ''
      })

      this.router.navigate(['/list']);
    }
  }
}
