import { Component } from '@angular/core';
import { FileLinkService } from 'src/app/services/file-link/file-link.service';
import { IPFSService } from 'src/app/services/ipfs/ipfs.service';
import { OrbitDBService } from 'src/app/services/orbitdb/orbit-db.service';

@Component({
  selector: 'nav-component',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
}
