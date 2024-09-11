import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  form: FormGroup | null = null;

  constructor() { }

  getForm() {
    return this.form
  }

  setForm(form: FormGroup) {
    this.form = form
  }
}
