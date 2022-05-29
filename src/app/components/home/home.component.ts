import { Component } from '@angular/core';
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
    private orbitDBService: OrbitDBService
  ) {}

  async onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    await this.createFiles(event?.dataTransfer?.files);
  }

  openFileSelector() {
    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('multiple', '');
    input.onchange = async () => {
      await this.createFiles(input.files);
    };

    input.click();
  }

  async createFiles(files?: FileList | null) {
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

          this.fileLinkService.createFileLink(address, () => {
            console.log("Created address: " + address);
          });
        }
      }
    }
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
