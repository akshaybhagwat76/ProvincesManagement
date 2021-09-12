import {
  Component,
  Injector,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { CountryServiceProxy, CreateOrEditCountryDto } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-create-country',
  templateUrl: './create-country-dialog.component.html'
})

export class CreateCountryDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  country: CreateOrEditCountryDto = new CreateOrEditCountryDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _countryService: CountryServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {

  }

  save(): void {
    this.saving = true;

    this._countryService.createOrEdit(this.country).subscribe(
      () => {
        this.notify.info(this.l('SavedSuccessfully'));
        this.bsModalRef.hide();
        this.onSave.emit();
      },
      () => {
        this.saving = false;
      }
    );
  }
}
