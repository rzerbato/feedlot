$(document).ready(function() {
    if($('#usuarios')) {
      $('#usuarios').DataTable( {
        columnDefs: [
          { width: '10%', targets: 0 }
      ],
      fixedColumns: true
      });
    }
} );