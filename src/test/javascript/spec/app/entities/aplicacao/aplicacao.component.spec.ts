import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AppCreatorTestModule } from '../../../test.module';
import { AplicacaoComponent } from 'app/entities/aplicacao/aplicacao.component';
import { AplicacaoService } from 'app/entities/aplicacao/aplicacao.service';
import { Aplicacao } from 'app/shared/model/aplicacao.model';

describe('Component Tests', () => {
  describe('Aplicacao Management Component', () => {
    let comp: AplicacaoComponent;
    let fixture: ComponentFixture<AplicacaoComponent>;
    let service: AplicacaoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AppCreatorTestModule],
        declarations: [AplicacaoComponent],
        providers: []
      })
        .overrideTemplate(AplicacaoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AplicacaoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AplicacaoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Aplicacao(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.aplicacaos && comp.aplicacaos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
