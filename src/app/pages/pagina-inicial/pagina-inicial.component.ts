import {Component, OnInit} from '@angular/core';
import {LeitorService} from "../../shared/services/leitor.service";

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit {

  enviando = false;
  files: File[] = [];

  constructor(private leitorService: LeitorService) {
  }

  ngOnInit(): void {
  }

  adicionarArquivos(event: any) {
    this.files.push(...event.addedFiles);
  }

  removerArquivos(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  enviarArquivos() {
    this.enviando = true;
    this.enviarProximoDaListaParaLeitura();
  }

  private enviarProximoDaListaParaLeitura() {
    this.leitorService.lerXML(this.files[0]).subscribe({
      next: () => {
        this.removerArquivoLido();
        if (this.files.length !== 0) {
          this.enviarProximoDaListaParaLeitura();
        }
      },
      error: (erro) => {
        console.error(erro.error.message);
        this.enviando = false;
      },
      complete: () => {
        console.log("Todos os arquivos foram processados com sucesso.");
        this.enviando = false
      }
    });
  }

  removerArquivoLido() {
    console.log("Arquivo " + this.files[0].name + " processado...");
    this.files.splice(0, 1);
  }
}
