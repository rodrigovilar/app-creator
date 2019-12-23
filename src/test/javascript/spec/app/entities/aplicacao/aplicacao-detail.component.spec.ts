import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AppCreatorTestModule } from '../../../test.module';
import { AplicacaoDetailComponent } from 'app/entities/aplicacao/aplicacao-detail.component';
import { Aplicacao } from 'app/shared/model/aplicacao.model';

describe('Component Tests', () => {
  describe('Aplicacao Management Detail Component', () => {
    let comp: AplicacaoDetailComponent;
    let fixture: ComponentFixture<AplicacaoDetailComponent>;
    const route = ({ data: of({ aplicacao: new Aplicacao(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AppCreatorTestModule],
        declarations: [AplicacaoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(AplicacaoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AplicacaoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load aplicacao on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.aplicacao).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
