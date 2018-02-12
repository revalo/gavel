var columnIndex;

$(document).ready(() => {
    // Find the filter column
    var $th = $('th[data-filter="filter"]');
    columnIndex = $("#items").find('th[data-filter="filter"]').index();

    // Remove sort stuff
    $th.removeClass('sort-header');

    var values = ['All']
    // Iterate through table and create an enum

    $("#items tr").each(function(i, row) {
        if (i == 0) return;
        var current = $(row).children().get(columnIndex);
        var currentText = $(current).text();

        if (values.indexOf(currentText) < 0) {
            values.push(currentText);
        }
    });

    // Create selector
    $th.text('');
    $th.replaceWith($th.clone());
    $th = $('th[data-filter="filter"]');

    var $sel = $('<select>');
    for (var i = 0; i < values.length; i++) {
        var $option = $('<option>').attr('value', values[i]).text(values[i]);
        $sel.append($option);
    }
    $sel.appendTo($th);

    // Attach selector change to filter
    $sel.change(() => {
        var selectValue = $sel.val();
        resetTable();
        if (selectValue != 'All') filter(selectValue);
    });
});

function resetTable() {
    $("#items tr").each(function(i, row) {
        if (i == 0) return;
        var current = $(row).children().get(columnIndex);
        var currentText = $(current).text();

        $(row).css('display', 'table-row');
    });
}

function filter(cat) {
    $("#items tr").each(function(i, row) {
        if (i == 0) return;
        var current = $(row).children().get(columnIndex);
        var currentText = $(current).text();

        if (currentText != cat)
            $(row).css('display', 'none');
    });
}