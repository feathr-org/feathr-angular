import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FileLink } from 'src/app/models/file-link.model';
import { FileLinkService } from 'src/app/services/file-link/file-link.service';
import { IPFSService } from 'src/app/services/ipfs/ipfs.service';
import { OrbitDBService } from 'src/app/services/orbitdb/orbit-db.service';

@Component({
  selector: 'file-component',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss'],
})
export class FileComponent {
  fileLink?: FileLink;

  constructor(
    private fileLinkService: FileLinkService,
    private ipfsService: IPFSService,
    private orbitDBService: OrbitDBService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params) => {
      if (params.id) {
        this.fileLink = await this.fileLinkService.getFileLink(params.id);
        console.log(this.fileLink);
      }
    });
  }
}
