import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Offer {
  id: number; name: string; discountType: 'percentage' | 'fixed'; discountValue: number;
  startDate: string; endDate: string; status: 'active' | 'scheduled' | 'expired'; description?: string;
}

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './offers.component.html',
  styleUrl: './offers.component.scss',
})
export class OffersComponent {

  showDialog   = signal(false);
  activeFilter = signal('all');

  filters = [
    { label:'All',       value:'all'       },
    { label:'Active',    value:'active'    },
    { label:'Scheduled', value:'scheduled' },
    { label:'Expired',   value:'expired'   },
  ];

  offers = signal<Offer[]>([
    { id:1, name:'Summer Discount',    discountType:'percentage', discountValue:20, startDate:'2026-06-01', endDate:'2026-08-31', status:'active',    description:'20% off all plans during summer season' },
    { id:2, name:'Family Membership',  discountType:'fixed',      discountValue:30, startDate:'2026-06-01', endDate:'2026-12-31', status:'active',    description:'JD 30 discount for family enrollments' },
    { id:3, name:'Ramadan Special',    discountType:'percentage', discountValue:15, startDate:'2026-02-28', endDate:'2026-03-29', status:'expired',   description:'Special discount during Ramadan' },
    { id:4, name:'New Year Offer',     discountType:'percentage', discountValue:25, startDate:'2027-01-01', endDate:'2027-01-31', status:'scheduled', description:'Welcome the new year with 25% off' },
    { id:5, name:'Student Discount',   discountType:'fixed',      discountValue:10, startDate:'2026-09-01', endDate:'2026-12-31', status:'scheduled', description:'Special rates for students' },
  ]);

  filteredOffers = computed(() => {
    if (this.activeFilter() === 'all') return this.offers();
    return this.offers().filter(o => o.status === this.activeFilter());
  });

  activeCount    = computed(() => this.offers().filter(o => o.status === 'active').length);
  scheduledCount = computed(() => this.offers().filter(o => o.status === 'scheduled').length);
  expiredCount   = computed(() => this.offers().filter(o => o.status === 'expired').length);

  newOffer: Partial<Offer> = {
    name:'', discountType:'percentage', discountValue:0, startDate:'', endDate:'', description:'',
  };

  saveOffer(): void {
    if (!this.newOffer.name?.trim()) return;
    const offer: Offer = {
      id:            this.offers().length + 1,
      name:          this.newOffer.name!,
      discountType:  this.newOffer.discountType!,
      discountValue: this.newOffer.discountValue!,
      startDate:     this.newOffer.startDate!,
      endDate:       this.newOffer.endDate!,
      status:        'scheduled',
      description:   this.newOffer.description,
    };
    this.offers.update(list => [...list, offer]);
    this.newOffer = { name:'', discountType:'percentage', discountValue:0, startDate:'', endDate:'', description:'' };
    this.showDialog.set(false);
  }
}
