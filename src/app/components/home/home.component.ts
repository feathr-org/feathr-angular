import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FileLink } from 'src/app/models/file-link.model';
import { FileLinkService } from 'src/app/services/file-link/file-link.service';
import { IPFSService } from 'src/app/services/ipfs/ipfs.service';
import { OrbitDBService } from 'src/app/services/orbitdb/orbit-db.service';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(
    private fileLinkService: FileLinkService,
    private ipfsService: IPFSService,
    private orbitDBService: OrbitDBService,
    private router: Router
  ) {}

  async onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    let files = await this.createFiles(event?.dataTransfer?.files);
  }

  openFileSelector() {
    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('multiple', '');
    input.onchange = async () => {
      let files = await this.createFiles(input.files);

      if (files.length == 1) {
        this.router.navigate(['/file/' + files[0].ID]);
      }
    };

    input.click();
  }

  async createFiles(files?: FileList | null): Promise<Array<FileLink>>{
    let fileLinks = new Array<FileLink>();
    if (files && files.length > 0) {
      // Get IPFS node
      const ipfs = await this.ipfsService.getLocalNode();

      // Load OrbitDB from IPFS node
      await this.orbitDBService.loadLocalInstance(ipfs);

      // Create all files
      for (let i in files) {
        const file = files[i];

        if (file.type && file.name) {
          const blob = new Blob([file], { type: file.type });
          const address = await this.orbitDBService.createFile(file.name);
          await this.orbitDBService.updateFile(address, blob);

          let fileLink = await this.fileLinkService.createFileLink(address);
          fileLinks.push(fileLink);
        }
      }
    }

    return fileLinks;
  }

  downloadBlob(blob: Blob) {
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'file.png';
    a.click();
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
