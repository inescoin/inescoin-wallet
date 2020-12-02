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
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { UiSwitchModule } from 'ngx-ui-switch';
import { DragulaModule } from 'ng2-dragula';

import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TimeAgoPipe } from 'time-ago-pipe';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCoffee, fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { NgxTagsInputModule } from 'ngx-tags-input';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ToastrModule } from 'ngx-toastr';
import { DoorgetsTranslateModule , NgTranslate, NgTranslateAbstract } from 'doorgets-ng-translate';
import { DoorgetsTruncateModule } from 'doorgets-ng-truncate';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxTinymceModule } from 'ngx-tinymce';
import { ColorPickerModule } from 'ngx-color-picker';

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

import { SettingsComponent } from './account/settings/settings.component';

import { CryptoAmountPipe } from './_/pipes/crypto-amount.pipe';
import { CryptoConverterPipe } from './_/pipes/crypto-converter.pipe';
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
import { WebComponent } from './account/web/web.component';
import { WebCreateComponent } from './account/web/web-create/web-create.component';
import { WebUpdateComponent } from './account/web/web-update/web-update.component';
import { DomainCreateComponent } from './_/components/modal-action/form/domain-create/domain-create.component';
import { WebDetailsComponent } from './account/web/web-details/web-details.component';
import { DomainUpdateComponent } from './_/components/modal-action/form/domain-update/domain-update.component';
import { DomainChangeOwnerComponent } from './_/components/modal-action/form/domain-change-owner/domain-change-owner.component';
import { DomainAddLangueComponent } from './_/components/modal-action/form/domain-add-langue/domain-add-langue.component';
import { DomainRemoveLangueComponent } from './_/components/modal-action/form/domain-remove-langue/domain-remove-langue.component';
import { AccountKeysComponent } from './_/components/modal-action/form/account-keys/account-keys.component';
import { AccountRemoveComponent } from './_/components/modal-action/form/account-remove/account-remove.component';
import { AccountResetPasswordComponent } from './_/components/modal-action/form/account-reset-password/account-reset-password.component';
import { AccountRequestComponent } from './_/components/modal-action/form/account-request/account-request.component';
import { ProductCreateComponent } from './_/components/modal-action/form/product-create/product-create.component';
import { ProductUpdateComponent } from './_/components/modal-action/form/product-update/product-update.component';
import { ProductRemoveComponent } from './_/components/modal-action/form/product-remove/product-remove.component';
import { CategoriesRemoveComponent } from './_/components/modal-action/form/categories-remove/categories-remove.component';
import { CategoriesCreateComponent } from './_/components/modal-action/form/categories-create/categories-create.component';
import { CategoriesUpdateComponent } from './_/components/modal-action/form/categories-update/categories-update.component';
import { StoreCategoriesComponent } from './_/components/ui/store-categories/store-categories.component';
import { ProductImportComponent } from './_/components/modal-action/form/product-import/product-import.component';

export function newNgTranslate(http: HttpClient) {
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
    CryptoConverterPipe,
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
    WebComponent,
    WebCreateComponent,
    WebUpdateComponent,
    DomainCreateComponent,
    WebDetailsComponent,
    DomainUpdateComponent,
    DomainChangeOwnerComponent,
    DomainAddLangueComponent,
    DomainRemoveLangueComponent,
    AccountKeysComponent,
    AccountRemoveComponent,
    AccountResetPasswordComponent,
    AccountRequestComponent,
    ProductCreateComponent,
    ProductUpdateComponent,
    ProductRemoveComponent,
    CategoriesRemoveComponent,
    CategoriesCreateComponent,
    CategoriesUpdateComponent,
    StoreCategoriesComponent,
    ProductImportComponent,
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
    TransferDetailsComponent,
    DomainCreateComponent,
    DomainUpdateComponent,
    DomainChangeOwnerComponent,
    DomainAddLangueComponent,
    DomainRemoveLangueComponent,
    AccountKeysComponent,
    AccountRemoveComponent,
    AccountResetPasswordComponent,
    AccountRequestComponent,
    ProductCreateComponent,
    ProductUpdateComponent,
    ProductRemoveComponent,
    ProductImportComponent,
    CategoriesRemoveComponent,
    CategoriesCreateComponent,
    CategoriesUpdateComponent,
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
    NgxTinymceModule.forRoot({
      baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/5.0.16/'
    }),
    NgxJsonViewerModule,
    ColorPickerModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    DoorgetsTranslateModule.forRoot({
      provide: NgTranslateAbstract,
      useFactory: (newNgTranslate),
      deps: [Http]
    }),
    DragulaModule.forRoot(),
    ToastrModule.forRoot(),
    TypeaheadModule.forRoot(),
    BrowserAnimationsModule,
    NgxQRCodeModule,
    FontAwesomeModule,
    ZXingScannerModule,
    NgxDatatableModule,
    SocketIoModule.forRoot(config),
    UiSwitchModule,
    PasswordStrengthBarModule,
    PickerModule,
    NgxTagsInputModule,
    NgxPaginationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    library.addIcons(faCoffee);
  }
}
