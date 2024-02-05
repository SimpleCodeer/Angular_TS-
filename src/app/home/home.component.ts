import { Component ,inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocationComponent,CommonModule,FormsModule],
  template: `
    <section>
      <form (ngSubmit)="onSearch($event)">
        <input type="text" placeholder="Filter By City" #filter>
        <button type='submit' class="primary" (click)="filterResults(filter.value)" >Search</button>
      </form>
    </section>
    <section class="housing_location">
      <app-housing-location 
      *ngFor="let housingLocation of filteredLocationList"
      [housingLocation]="housingLocation">
    </app-housing-location>
    </section>
  `,
  styleUrl: './home.component.scss'
})
export class HomeComponent {
   
  readonly baseUrl='https://angular.io/assets/images/tutorials/faa';

  housingLocationList:HousingLocation[]=[]

  filteredLocationList:HousingLocation[]=[]

  housingService:HousingService=inject(HousingService)

  filterResults(text:string){

    if(!text){
      this.filteredLocationList=this.housingLocationList;
      return;
    }
    this.filteredLocationList=this.housingLocationList.filter(
      housingLocation=>housingLocation?.city.toLowerCase().includes(text.toLowerCase())
    )
  }

  onSearch(event:Event){
    event.preventDefault()
  }

  constructor(){
    this.housingLocationList=this.housingService.getAllHousingLocations();
    this.filteredLocationList=this.housingLocationList
  }



}
