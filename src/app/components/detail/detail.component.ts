import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/interfaces/item.interface';
import { GetLocalStorageDataService } from 'src/app/services/get-local-storage-data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  item!: Item[];

  constructor(
    private route: ActivatedRoute,
    private getLocalStorageDataService: GetLocalStorageDataService
  ){}

  ngOnInit() {
    this.getItem()
  }

  getItem() {
    const id = this.route.snapshot.paramMap.get('id');
    
    this.getLocalStorageDataService.getItem(Number(id)).subscribe(item => {
      this.item = item;
    })
  }

}
