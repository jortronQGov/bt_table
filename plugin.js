/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.plugins.add( 'bootstrap4_table', {
  requires: 'dialog,table',
  icons: 'table', // %REMOVE_LINE_CORE%
  lang: 'en,et,ru,fr,de',
  hidpi: true, // %REMOVE_LINE_CORE%
    init: function( editor ) {
      if ( editor.blockless )
        return;

      var lang = editor.lang.table;

      editor.addCommand( 'bootstrap4_table', new CKEDITOR.dialogCommand( 'bootstrap4_table', {
        context: 'table',
        allowedContent: 'table{width,height}[align,border,cellpadding,cellspacing,summary];' +
          'caption tbody thead tfoot;' +
          'th td tr[scope];' +
          ( editor.plugins.dialogadvtab ? 'table' + editor.plugins.dialogadvtab.allowedContent() : '' ),
        requiredContent: 'table',
        contentTransformations: [
          [ 'table{width}: sizeToStyle', 'table[width]: sizeToAttribute' ]
        ]
      } ) );

      function createDef( def ) {
        return CKEDITOR.tools.extend( def || {}, {
          contextSensitive: 1,
          refresh: function( editor, path ) {
            this.setState( path.contains( 'table', 1 ) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED );
          }
        } );
      }

      editor.addCommand( 'bootstrap4_tableProperties', new CKEDITOR.dialogCommand( 'bootstrap4_tableProperties', createDef() ) );

      editor.ui.addButton && editor.ui.addButton( 'Table', {
        label: lang.toolbar,
        command: 'bootstrap4_table',
        toolbar: 'insert,30'
      } );

      CKEDITOR.dialog.add( 'bootstrap4_table', this.path + 'dialogs/table.js' );
      CKEDITOR.dialog.add( 'bootstrap4_tableProperties', this.path + 'dialogs/table.js' );

      // If the "menu" plugin is loaded, register the menu items.
      if ( editor.addMenuItems ) {
        editor.addMenuItems( {
          table: {
            label: lang.menu,
            command: 'bootstrap4_tableProperties',
            group: 'table',
            order: 5
          },
        } );
      }

      editor.on( 'doubleclick', function( evt ) {
        var element = evt.data.element;

        if ( element.is( 'table' ) )
          evt.data.dialog = 'bootstrap4_tableProperties';
      } );

      // If the "contextmenu" plugin is loaded, register the listeners.
      if ( editor.contextMenu ) {
        editor.contextMenu.addListener( function() {
          // menu item state is resolved on commands.
          return {
            bootstrap4_table: CKEDITOR.TRISTATE_OFF
          };
        });
      }
    }
  }
);
