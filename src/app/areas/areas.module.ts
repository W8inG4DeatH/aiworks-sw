import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CommonComponentsModule } from 'src/app/common-components/common-components.module';
import { DashboardModule } from 'src/app/areas/dashboard/dashboard.module';
import { ListModule } from 'src/app/areas/list/list.module';
import { EditionModule } from 'src/app/areas/edition/edition.module';
import { LoginModule } from 'src/app/areas/login/login.module';
import { MainHeaderComponent } from 'src/app/areas/main-header/main-header.component';
import { MainMenuComponent } from 'src/app/areas/main-menu/main-menu.component';

@NgModule({
    declarations: [MainHeaderComponent, MainMenuComponent],
    imports: [
        CommonModule,
        AppRoutingModule,
        FlexLayoutModule,
        CommonComponentsModule,
        DashboardModule,
        ListModule,
        EditionModule,
        LoginModule,
    ],
    exports: [MainHeaderComponent, MainMenuComponent],
})
export class AreasModule {}
