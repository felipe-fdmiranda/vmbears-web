import {Component, OnInit} from '@angular/core';
import {LeitorService} from "../../shared/services/leitor.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit {

  enviando = false;
  files: File[] = [];

  constructor(private leitorService: LeitorService,
              private _snackBar: MatSnackBar) {
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
        } else {
          this.enviando = false;
          this.mostrarMensagem("Todos os arquivos foram processados com sucesso.", false);
        }
      },
      error: (erro) => {
        console.error(erro.error.message)
        this.mostrarMensagem("Erro ao processar o arquivo XML.", true);
        this.enviando = false;
      }
    });
  }

  removerArquivoLido() {
    this.files.splice(0, 1);
  }

  mostrarMensagem(mensagem: string, erro: boolean) {
    this._snackBar.open(mensagem, 'X', {
      duration: 5000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
      panelClass: erro ? 'erro-snackbar' : 'success-snackbar',
    });
  }
}
