import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/interfaces/item.interface';
import { GetLocalStorageDataService } from 'src/app/services/get-local-storage-data.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  private items: Item[] = [
    {
      id: 1,
      title: 'The Rise of Sustainable Fashion',
      description: 'A look at the increasing popularity of eco-friendly and socially responsible fashion brands.',
      detail: 'The car is a compact vehicle with a fuel-efficient engine, a spacious interior, and advanced safety features, making it ideal for city driving.',
      img: '../../../assets/attachments/1.png'
    },
    {
      id: 2,
      title: 'The Benefits of Meditation for Mental Health',
      description: 'An exploration of how mindfulness practices can improve mental wellness and reduce stress.',
      detail: 'The smartphone has a high-resolution screen, a fast processor, and a long-lasting battery, enabling users to enjoy multimedia content and stay connected all day.',
      img: '../../../assets/attachments/2.png'
    },
    {
      id: 3,
      title: 'How Artificial Intelligence is Transforming Healthcare',
      description: 'An overview of the ways AI is being used to improve medical diagnoses, drug development, and patient outcomes.',
      detail: 'The hiking boots are made of durable, waterproof materials and have a comfortable, supportive fit, making them perfect for long treks in rough terrain.',
      img: '../../../assets/attachments/3.png'
    },
    {
      id: 4,
      title: 'The Future of Work: Embracing Remote and Flexible Work Arrangements',
      description: 'An analysis of the impact of remote work on businesses and employees, and the potential for increased flexibility in the modern workplace.',
      detail: 'The camera is a professional-grade device with a large sensor, multiple lenses, and advanced features such as image stabilization and high-speed autofocus, making it ideal for capturing stunning photographs and videos.',
      img: '../../../assets/attachments/4.png'
    },
    {
      id: 5,
      title: 'Exploring the Wonders of Deep Sea Exploration',
      description: 'A journey into the mysteries of the ocean floor and the fascinating creatures that live in the deep sea.',
      detail: 'The restaurant is a cozy, family-owned establishment that serves authentic cuisine from the region, using fresh, locally-sourced ingredients and traditional cooking techniques to create delicious, flavorful dishes.'
    }
  ]
  listItems: Item[] = [];
  isAuth: boolean = false;

  constructor(
    private GetLocalStorageDataService: GetLocalStorageDataService,
    private AuthService: AuthService,
    private router: Router,
    private storage: Storage
  ) {
    this.storage = window.localStorage;

    if(this.storage.getItem('token')) {
      this.isAuth = true;
    }
    // this.storage.clear();
    if (!this.storage.getItem('items')) {
      this.storage.setItem('items', JSON.stringify(this.items))
    }
  }

  ngOnInit() {
    this.loadItems()
  }

  loadItems() {
    this.GetLocalStorageDataService.getItems().subscribe(data => {
      try {
        console.log(data);
        this.listItems = data;
      } catch (err) {
        console.log(err);
      }
    })
  }

  createItem() {
      this.router.navigate(['/create']);
  }

  editItem(item: Item, index: number) {
      this.router.navigate(['/edit', index]);
  }

  deleteItem(item: Item, index: number) {
    if(confirm(`Are you sure you want to delete ${item.title}?`)) {
      this.GetLocalStorageDataService.deleteItem(index).subscribe(data => {
        try {
          console.log(data);
          this.listItems = data;
        } catch (err) {
          console.log(err)
        }
      })
    }
  }

  showDetail(item: Item, index: number) {
      this.router.navigate(['/detail', index]);
  }

  loginLogout(){
    if(this.isAuth){
      if(confirm('Are you sure you want to logout?')){
        this.AuthService.logout();
        this.isAuth = false;
      }
    }else {
      this.router.navigate(['/login']);
    }
  }

}