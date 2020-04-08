import {HttpResponseErrorHandler} from "./http-response-error-handler";
import {HttpErrorResponse} from "@angular/common/http";
import {MessageService} from "primeng";
import {Injectable} from "@angular/core";

@Injectable()
export class LoginErrorHandler implements HttpResponseErrorHandler{
  constructor(private messageService: MessageService) {
  }

  matches(error: HttpErrorResponse): boolean {
    return error.status === 403;
  }

  handle(error: HttpErrorResponse) {
    this.messageService.add({severity: 'error', summary: 'Fehler', detail: 'Falscher Benutzername oder Passwort', life: 5000});
  }
}
