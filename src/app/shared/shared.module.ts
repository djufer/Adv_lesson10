import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TruncatePipe } from './pipes/truncate.pipe';

const MATERIAL = [
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatIconModule
];

// other modules
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
    declarations: [TruncatePipe  ],
    imports: [...MATERIAL,
      FormsModule,
      ReactiveFormsModule

    ],
    exports: [...MATERIAL,
      FormsModule,
      ReactiveFormsModule,
      TruncatePipe
    ]
})

export class SharedModule {}
