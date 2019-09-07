// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountComponent } from './account/account.component';
import { WalletComponent } from './account/wallet/wallet.component';

import { WalletCreateComponent } from './account/wallet/wallet-create/wallet-create.component';
import { WalletAccountComponent } from './account/wallet/wallet-account/wallet-account.component';
import { WalletImportComponent } from './account/wallet/wallet-import/wallet-import.component';
import { WalletSendComponent } from './account/wallet/wallet-send/wallet-send.component';

import { MessengerComponent } from './account/messenger/messenger.component';
import { MessengerChatComponent } from './account/messenger/messenger-chat/messenger-chat.component';
import { InProgressMessengerComponent } from './account/messenger/in-progress-messenger/in-progress-messenger.component';

import { ContactsComponent } from './account/contacts/contacts.component';
import { ContactsCreateComponent } from './account/contacts/contacts-create/contacts-create.component';
import { ContactsUpdateComponent } from './account/contacts/contacts-update/contacts-update.component';
import { ContactsDetailsComponent } from './account/contacts/contacts-details/contacts-details.component';

import { SettingsComponent } from './account/settings/settings.component';
import { SettingsNodesComponent } from './account/settings/settings-nodes/settings-nodes.component';
import { SettingsProfileComponent } from './account/settings/settings-profile/settings-profile.component';
import { SettingsMessengerComponent } from './account/settings/settings-messenger/settings-messenger.component';

export const routes: Routes = [ {
    path: '',
    // canActivate: [AuthGuard],
    // canActivateChild: [AuthGuard],
    component: AccountComponent,
        children: [{
            path:'',
            redirectTo: 'wallet',
            pathMatch: 'full'
        },{
            path: 'wallet',
            component: WalletComponent
        },{
            path: 'wallet/:address',
            component: WalletAccountComponent
        },{
            path: 'wallet-create',
            component: WalletCreateComponent
        },{
            path: 'wallet-import',
            component: WalletImportComponent
        },{
            path: 'wallet-send',
            component: WalletSendComponent
        },{
            path: 'messenger',
            component: InProgressMessengerComponent
        },{
            path: 'messenger/:address',
            component: MessengerChatComponent
        },{
            path: 'contacts',
            component: ContactsComponent
        },{
            path: 'contacts-create',
            component: ContactsCreateComponent
        },{
            path: 'contacts-update/:address',
            component: ContactsUpdateComponent
        },{
            path: 'contacts-details/:address',
            component: ContactsDetailsComponent
        },{
            path: 'settings',
            component: SettingsComponent,
            children: [{
                  path:'',
                  redirectTo: 'profile',
                  pathMatch: 'full'
              },{
                path: 'nodes',
                component: SettingsNodesComponent
              }, {
                path: 'profile',
                component: SettingsProfileComponent
              }, {
                path: 'messenger',
                component: SettingsMessengerComponent
            }]
    }]
}];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
