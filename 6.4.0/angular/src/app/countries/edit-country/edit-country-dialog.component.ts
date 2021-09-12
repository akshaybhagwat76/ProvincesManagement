import { Component, Injector, OnInit, Output, EventEmitter } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { CountryServiceProxy, CreateOrEditCountryDto, GetCountryForEditOutput } from '@shared/service-proxies/service-proxies';
import { BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country-dialog.component.html'
})
export class EditCountryDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  country: GetCountryForEditOutput = new GetCountryForEditOutput();
  id: number;
  countryDto: CreateOrEditCountryDto = new CreateOrEditCountryDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    public _countryService: CountryServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._countryService.getCountryForEdit(this.id).subscribe((result: GetCountryForEditOutput) => {
      this.country = result;
    });
  }

  save(): void {
    this.saving = true;
    this.countryDto.countryName = this.country.country.countryName;
    this._countryService.createOrEdit(this.countryDto).subscribe(
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
