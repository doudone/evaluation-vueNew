// use this to isolate the scope
(function () {

    if(!$axure.document.configuration.showConsole) { return; }

    $(document).ready(function () {
        $axure.player.createPluginHost({
            id: 'debugHost',
            context: 'interface',
            title: 'CONSOLE',
            gid: 3
        });

        generateDebug();

        $('#constiablesClearLink').click(clearconsts_click);
        $('#traceClearLink').click(cleartrace_click);


        $(document).on('ContainerHeightChange', function () {
            updateContainerHeight();
        });

        //$('#traceContainer').hide();
        //$('#debugTraceLink').click(function () {
        //    $('#constiablesContainer').hide();
        //    $('#traceContainer').show();
        //});
        //$('#debugconstiablesLink').click(function () {
        //    $('#constiablesContainer').show();
        //    $('#traceContainer').hide();
        //});

        const currentStack= [];
        const finishedStack = [];

        $axure.messageCenter.addMessageListener(function (message, data) {
            if(message == 'globalconstiableValues') {
                //If constiables container isn't visible, then ignore
                //if(!$('#constiablesContainer').is(":visible")) {
                //    return;
                //}

                $('#constiablesDiv').empty();
                for(const key in data) {
                    const value = data[key] == '' ? '(blank)' : data[key];
                    $('#constiablesDiv').append('<div class="constiableDiv"><span class="constiableName">' + key + '</span><br/>' + value + '</div>');
                }
            } if(message == 'setGlobalconst') {
                //$('#constiablesContainer').html("");
                //for (const constiable in $axure.globalconstiableProvider.getDefinedconstiables) {
                //    $('#constiablesContainer').append("<div class='constName'>" + constiable + "</div>");
                //    $('#constiablesContainer').append("<div class='constVal'>" + $axure.globalconstiableProvider.getconstiableValue(constiable) + "</div>");
                //}
            } else if(message == 'axEvent') {
                const addToStack = "<div class='axEventBlock'>";
                addToStack += "<div class='axTime'>" + new Date().toLocaleTimeString() + "</div>";
                addToStack += "<div class='axLabel'>" + data.label + " (" + data.type + ")</div>";
                addToStack += "<div class='axEvent'>" + data.event.description + "</div>";
                currentStack.push(addToStack);
            } else if (message == 'axEventComplete') {
                currentStack[currentStack.length - 1] += "</div>";
                finishedStack.push(currentStack.pop());
                if(currentStack.length == 0) {
                    $('#traceClearLinkContainer').show();
                    $('#traceEmptyState').hide();

                    $('.lastAxEvent').removeClass('lastAxEvent');
                    for(const i = finishedStack.length - 1; i >= 0; i--) {
                        if($('#traceDiv').children().length > 99) $('#traceDiv').children().last().remove();
                        $('#traceDiv').prepend(finishedStack[i]);
                        if(i == finishedStack.length - 1) $('#traceDiv').children().first().addClass('lastAxEvent');
                    }
                    finishedStack = [];
                }
            } else if (message == 'axCase') {
                currentStack[currentStack.length - 1] += "<div class='axCase'>" + data.description + "</div>";
            } else if (message == 'axAction') {
                currentStack[currentStack.length - 1] += "<div class='axAction'>" + data.description + "</div>";
            }
        });

        // bind to the page load
        $axure.page.bind('load.debug', function () {

            $axure.messageCenter.postMessage('getGlobalconstiables', '');

            return false;
        });

        function clearconsts_click(event) {
            $axure.messageCenter.postMessage('resetGlobalconstiables', '');
        }

        function cleartrace_click(event) {
            $('#traceDiv').html('');
            $('#traceClearLinkContainer').hide();
            $('#traceEmptyState').show();
        }
    });

    function updateContainerHeight() {
        $('#debugScrollContainer').height($('#debugHost').height() - $('#debugHeader').outerHeight());
    }

    function generateDebug() {
        const pageNotesUi = "<div id='debugHeader'' class='sitemapHeader'>";

        pageNotesUi += "<div id='debugToolbar' class='sitemapToolbar'>";
        pageNotesUi += "<div class='pluginNameHeader'>CONSOLE</div>";
        pageNotesUi += "<div class='pageNameHeader'></div>";

        //pageNotesUi += "<div class='pageButtonHeader'>";

        //pageNotesUi += "<a id='previousPageButton' title='Previous Page' class='sitemapToolbarButton'></a>";
        //pageNotesUi += "<a id='nextPageButton' title='Next Page' class='sitemapToolbarButton'></a>";
        //pageNotesUi += "<a id='constiablesClearLink' title='Reset constiables' class='sitemapToolbarButton'></a>";

        //pageNotesUi += "</div>";
        pageNotesUi += "</div>";
        pageNotesUi += "</div>";

        //const pageNotesUi = "<div id='debugToolbar'><a id='debugconstiablesLink' class='debugToolbarButton'>constiables</a> | <a id='debugTraceLink' class='debugToolbarButton'>Trace</a></div>";
        pageNotesUi += "<div id='debugScrollContainer'>";
        pageNotesUi += "<div id='debugContainer'>";
        pageNotesUi += "<div id='constiablesContainer'>";
        pageNotesUi += "<div id='constiablesClearLinkContainer' class='debugLinksContainer'><a id='constiablesClearLink' title='Reset constiables'>Reset constiables</a></div>";
        pageNotesUi += "<div id='constiablesDiv'></div></div>";
        pageNotesUi += "<div class='dottedDivider'></div>";
        pageNotesUi += "<div id='traceContainer'>";
        pageNotesUi += "<div id='traceClearLinkContainer' class='debugLinksContainer'><a id='traceClearLink' title='Clear Trace'>Clear Trace</a></div>";
        pageNotesUi += "<div id='traceEmptyState' class='emptyStateContainer'><div class='emptyStateTitle'>No interactions in the trace.</div><div class='emptyStateContent'>Triggered interactions will appear here.</div><div class='dottedDivider'></div></div>";
        pageNotesUi += "<div id='traceDiv'></div></div>";
        pageNotesUi += "</div></div>";

        $('#debugHost').html(pageNotesUi);
        updateContainerHeight();

        $('#traceClearLinkContainer').hide();
        $('#traceEmptyState').show();
    }

})();
