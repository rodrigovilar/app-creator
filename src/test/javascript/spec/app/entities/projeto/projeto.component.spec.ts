import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AppCreatorTestModule } from '../../../test.module';
import { ProjetoComponent } from 'app/entities/projeto/projeto.component';
import { ProjetoService } from 'app/entities/projeto/projeto.service';
import { Projeto } from 'app/shared/model/projeto.model';

describe('Component Tests', () => {
  describe('Projeto Management Component', () => {
    let comp: ProjetoComponent;
    let fixture: ComponentFixture<ProjetoComponent>;
    let service: ProjetoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AppCreatorTestModule],
        declarations: [ProjetoComponent],
        providers: []
      })
        .overrideTemplate(ProjetoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProjetoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProjetoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Projeto(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.projetos && comp.projetos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
