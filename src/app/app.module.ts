// Copyright 2019 The Inescoin developers.
// - Mounir R'Quiba
// Licensed under the GNU Affero General Public License, version 3.

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { UiSwitchModule } from 'ngx-ui-switch';

import 'hammerjs';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TimeAgoPipe } from 'time-ago-pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DoorgetsTruncateModule } from 'doorgets-ng-truncate';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ToastrModule } from 'ngx-toastr';
import { DoorgetsTranslateModule , NgTranslate, NgTranslateAbstract } from 'doorgets-ng-translate';

import { AccountComponent } from './account/account.component';

import { WalletComponent } from './account/wallet/wallet.component';
import { WalletCreateComponent } from './account/wallet/wallet-create/wallet-create.component';
import { WalletAccountComponent } from './account/wallet/wallet-account/wallet-account.component';
import { WalletImportComponent } from './account/wallet/wallet-import/wallet-import.component';
import { WalletSendComponent } from './account/wallet/wallet-send/wallet-send.component';

import { MessengerComponent } from './account/messenger/messenger.component';
import { MessengerChatComponent } from './account/messenger/messenger-chat/messenger-chat.component';

import { ContactsComponent } from './account/contacts/contacts.component';
import { ContactsCreateComponent } from './account/contacts/contacts-create/contacts-create.component';
import { ContactsUpdateComponent } from './account/contacts/contacts-update/contacts-update.component';
import { ContactsDetailsComponent } from './account/contacts/contacts-details/contacts-details.component';

import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { SettingsComponent } from './account/settings/settings.component';

import { CryptoAmountPipe } from './_/pipes/crypto-amount.pipe';
import { ModalActionComponent } from './_/components/modal-action/modal-action.component';
import { QrCodeScanComponent } from './_/components/modal-action/view/qr-code-scan/qr-code-scan.component';
import { QrCodeViewComponent } from './_/components/modal-action/view/qr-code-view/qr-code-view.component';
import { StartConversationComponent } from './_/components/modal-action/form/start-conversation/start-conversation.component';
import { SendCoinComponent } from './_/components/modal-action/form/send-coin/send-coin.component';
import { ContactAddComponent } from './_/components/modal-action/form/contact-add/contact-add.component';
import { ContactEditComponent } from './_/components/modal-action/form/contact-edit/contact-edit.component';
import { AccountCreateComponent } from './_/components/modal-action/form/account-create/account-create.component';
import { AccountImportComponent } from './_/components/modal-action/form/account-import/account-import.component';
import { ContactRemoveComponent } from './_/components/modal-action/form/contact-remove/contact-remove.component';
import { SettingsNodesComponent } from './account/settings/settings-nodes/settings-nodes.component';
import { SettingsProfileComponent } from './account/settings/settings-profile/settings-profile.component';
import { SettingsMessengerComponent } from './account/settings/settings-messenger/settings-messenger.component';
import { NodeAddComponent } from './_/components/modal-action/form/node-add/node-add.component';
import { NodeEditComponent } from './_/components/modal-action/form/node-edit/node-edit.component';
import { NodeRemoveComponent } from './_/components/modal-action/form/node-remove/node-remove.component';
import { SettingsNodesCreateComponent } from './account/settings/settings-nodes/settings-nodes-create/settings-nodes-create.component';
import { SettingsNodesUpdateComponent } from './account/settings/settings-nodes/settings-nodes-update/settings-nodes-update.component';
import { ProfileExportComponent } from './_/components/modal-action/form/profile-export/profile-export.component';
import { ProfileImportComponent } from './_/components/modal-action/form/profile-import/profile-import.component';
import { ProfileResetComponent } from './_/components/modal-action/form/profile-reset/profile-reset.component';

import { inescoinConfig } from './config/inescoin.config';
import { TransferDetailsComponent } from './_/components/modal-action/view/transfer-details/transfer-details.component';
import { InProgressMessengerComponent } from './account/messenger/in-progress-messenger/in-progress-messenger.component';

export function newNgTranslate(http: Http) {
  return new NgTranslate(http, '../../assets/public/locale');
}

registerLocaleData(localeFr, 'fr');

const config: SocketIoConfig = { url: inescoinConfig.messengerAddress, options: {} };

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    WalletComponent,
    MessengerComponent,
    ContactsComponent,
    SettingsComponent,
    WalletAccountComponent,
    WalletCreateComponent,
    WalletImportComponent,
    WalletSendComponent,
    ContactsCreateComponent,
    ContactsUpdateComponent,
    ContactsDetailsComponent,
    CryptoAmountPipe,

    MessengerChatComponent,
    ModalActionComponent,
    QrCodeScanComponent,
    QrCodeViewComponent,
    StartConversationComponent,
    TimeAgoPipe,
    SendCoinComponent,
    ContactAddComponent,
    ContactEditComponent,
    AccountCreateComponent,
    AccountImportComponent,
    ContactRemoveComponent,
    SettingsNodesComponent,
    SettingsProfileComponent,
    SettingsMessengerComponent,
    NodeAddComponent,
    NodeEditComponent,
    NodeRemoveComponent,
    SettingsNodesCreateComponent,
    SettingsNodesUpdateComponent,
    ProfileExportComponent,
    ProfileImportComponent,
    ProfileResetComponent,
    TransferDetailsComponent,
    InProgressMessengerComponent,
  ],
  entryComponents: [
    QrCodeScanComponent,
    QrCodeViewComponent,
    StartConversationComponent,
    SendCoinComponent,
    ContactAddComponent,
    ContactEditComponent,
    AccountCreateComponent,
    AccountImportComponent,
    ContactRemoveComponent,
    NodeAddComponent,
    NodeEditComponent,
    NodeRemoveComponent,
    ProfileExportComponent,
    ProfileImportComponent,
    ProfileResetComponent,
    TransferDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    DoorgetsTruncateModule,
    HttpModule,
    HttpClientModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    DoorgetsTranslateModule,
    DoorgetsTranslateModule.forRoot({
      provide: NgTranslateAbstract,
      useFactory: (newNgTranslate),
      deps: [Http]
    }),
    ToastrModule.forRoot(),
    TypeaheadModule.forRoot(),
    BrowserAnimationsModule,
    NgxQRCodeModule,
    FontAwesomeModule,
    ZXingScannerModule,
    NgxDatatableModule,
    SocketIoModule.forRoot(config),
    UiSwitchModule,
    PasswordStrengthBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(fas, far);
  }
}
