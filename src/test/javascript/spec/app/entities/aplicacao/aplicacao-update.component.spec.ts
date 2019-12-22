import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { AppCreatorTestModule } from '../../../test.module';
import { AplicacaoUpdateComponent } from 'app/entities/aplicacao/aplicacao-update.component';
import { AplicacaoService } from 'app/entities/aplicacao/aplicacao.service';
import { Aplicacao } from 'app/shared/model/aplicacao.model';

describe('Component Tests', () => {
  describe('Aplicacao Management Update Component', () => {
    let comp: AplicacaoUpdateComponent;
    let fixture: ComponentFixture<AplicacaoUpdateComponent>;
    let service: AplicacaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AppCreatorTestModule],
        declarations: [AplicacaoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(AplicacaoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AplicacaoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AplicacaoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Aplicacao(123);
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
        const entity = new Aplicacao();
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
