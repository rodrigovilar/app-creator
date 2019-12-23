import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { AppCreatorTestModule } from '../../../test.module';
import { ProjetoUpdateComponent } from 'app/entities/projeto/projeto-update.component';
import { ProjetoService } from 'app/entities/projeto/projeto.service';
import { Projeto } from 'app/shared/model/projeto.model';

describe('Component Tests', () => {
  describe('Projeto Management Update Component', () => {
    let comp: ProjetoUpdateComponent;
    let fixture: ComponentFixture<ProjetoUpdateComponent>;
    let service: ProjetoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AppCreatorTestModule],
        declarations: [ProjetoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProjetoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProjetoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProjetoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Projeto(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Projeto();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
