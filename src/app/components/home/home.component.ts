import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private httpClient: HttpClient) {

  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    console.log(event?.dataTransfer?.files);
    let file = event?.dataTransfer?.files[0];
    if (file) {
      const blob = new Blob([file],{type: 'png'});
      this.downloadBlob(blob);
    }
  }

  downloadBlob(blob: Blob) {
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "file.png";
    a.click();
  }

  openFileSelector() {
    var input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("multiple", "");
    input.onchange = () => {
      console.log(input.files);
    };

    input.click();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
  }
}
