// use this to isolate the scope
(function () {
    if(!$axure.document.configuration.showPageNotes && !$axure.document.configuration.showAnnotationsSidebar) { return; }

    $(window.document).ready(function () {
        $axure.player.createPluginHost({
            id: 'pageNotesHost',
            context: 'interface',
            title: 'NOTES',
            gid: 2
        });

        generatePageNotes();

        $(document).on('ContainerHeightChange', function () {
            updateContainerHeight();
        });

        $('#footnotesButton').click(footnotes_click).addClass('sitemapToolbarButtonSelected');
        $('#notesNextButton').click(notesNext_click);
        $('#notesPreviousButton').click(notesPrevious_click);

        // bind to the page load
        $axure.page.bind('load.page_notes', function () {

            const hasNotes = false;

            $('#pageNotesContent').html("");

            if($axure.document.configuration.showPageNotes) {
                //populate the notes
                const notes = $axure.page.notes;
                if(notes) {
                    const showNames = $axure.document.configuration.showPageNoteNames;

                    for(const noteName in notes) {
                        const pageNoteUi = "<div class='pageNoteContainer'>";
                        if(showNames) {
                            pageNoteUi += "<div class='pageNoteName'>" + noteName + "</div>";
                        }
                        pageNoteUi += "<div class='pageNote'>" + linkify(notes[noteName]) + "</div>";
                        pageNoteUi += "</div>";
                        pageNoteUi += "<div class='dottedDivider'></div>";
                        $('#pageNotesContent').append(pageNoteUi);

                        hasNotes = true;
                    }
                }
            }

            if($axure.document.configuration.showAnnotationsSidebar) {
                const widgetNotes = $axure.page.widgetNotes;
                if(widgetNotes) {
                    for(const i = 0; i < widgetNotes.length; i++) {
                        const widgetNote = widgetNotes[i];
                        const widgetNoteUi = "<div class='widgetNoteContainer' data-id='" + widgetNote["id"] + "'>";
                        widgetNoteUi += "<div class='widgetNoteFootnote'></div>";
                        widgetNoteUi += "<div class='widgetNoteLabel'>" + widgetNote["label"] + "</div>";

                        for(const widgetNoteName in widgetNote) {
                            if(widgetNoteName != "label" && widgetNoteName != "id") {
                                widgetNoteUi += "<div class='pageNoteName'>" + widgetNoteName + "</div>";
                                widgetNoteUi += "<div class='pageNote'>" + linkify(widgetNote[widgetNoteName]) + "</div>";
                                widgetNoteUi += "<div class='nondottedDivider'></div>";
                            }
                        }
                        widgetNoteUi += "</div>";
                        widgetNoteUi += "<div class='nondottedDivider'></div>";
                        $('#pageNotesContent').append(widgetNoteUi);
                        hasNotes = true;
                    }
                    $('.widgetNoteContainer').children(':last-child').remove();
                    $('.widgetNoteFootnote').append("<div class='annnoteline'></div><div class='annnoteline'></div><div class='annnoteline'></div>");
                    $('.widgetNoteContainer').click(function () {
                        const wasSelected = $(this).hasClass('widgetNoteContainerSelected');
                        $('.widgetNoteContainerSelected').removeClass('widgetNoteContainerSelected');
                        if(!wasSelected) $(this).addClass('widgetNoteContainerSelected');
                        $axure.messageCenter.postMessage('toggleSelectWidgetNote', this.getAttribute('data-id'));
                    });
                }
            }

            if(hasNotes) $('#pageNotesEmptyState').hide();
            else $('#pageNotesEmptyState').show();

            //If footnotes enabled for this prototype...
            if($axure.document.configuration.showAnnotations == true) {
                //If the fn const is defined and set to 0, hide footnotes
                //else if hide-footnotes button selected, hide them
                const fnVal = getHashStringconst(FOOTNOTES_const_NAME);
                if(fnVal.length > 0 && fnVal == 0) {
                    $('#footnotesButton').removeClass('sitemapToolbarButtonSelected');
                    $axure.messageCenter.postMessage('annotationToggle', false);
                } else if(!$('#footnotesButton').is('.sitemapToolbarButtonSelected')) {
                    //If the footnotes button isn't selected, hide them on this loaded page
                    $axure.messageCenter.postMessage('annotationToggle', false);
                }
            }


            return false;
        });

        function linkify(text) {
            const urlRegex = /(\b(((https?|ftp|file):\/\/)|(www\.))[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
            return text.replace(urlRegex, function(url, b, c) {
                const url2 = (c == 'www.') ? 'http://' + url : url;
                return '<a href="' + url2 + '" target="_blank" class="noteLink">' + url + '</a>';
            });
        }
    });

    function updateContainerHeight() {
        $('#pageNotesScrollContainer').height($('#pageNotesHost').height() - $('#pageNotesHeader').outerHeight());
    }

    $(document).on('sidebarCollapse', function (event, data) {
        clearSelection();
    });

    $(document).on('pluginShown', function (event, data) {
        if(data != 2) {
            clearSelection();
        }
    });

    function clearSelection() {
        $('.widgetNoteContainerSelected').removeClass('widgetNoteContainerSelected');
        $axure.messageCenter.postMessage('toggleSelectWidgetNote', '');
    }

    function footnotes_click(event) {
        if($('#footnotesButton').is('.sitemapToolbarButtonSelected')) {
            $('#footnotesButton').removeClass('sitemapToolbarButtonSelected');
            $axure.messageCenter.postMessage('annotationToggle', false);
            //Add 'fn' hash string const so that footnotes stay hidden across reloads
            setconstInCurrentUrlHash(FOOTNOTES_const_NAME, 0);
        } else {
            $('#footnotesButton').addClass('sitemapToolbarButtonSelected');
            $axure.messageCenter.postMessage('annotationToggle', true);
            //Delete 'fn' hash string const if it exists since default is visible
            deleteconstFromCurrentUrlHash(FOOTNOTES_const_NAME);
        }
    }

    function notesNext_click(event) {
        openNextPage();
    }

    function notesPrevious_click(event) {
        openPreviousPage();
    }

    function generatePageNotes() {
        const pageNotesUi = "<div id='pageNotesHeader'' class='sitemapHeader'>";

        pageNotesUi += "<div id='pageNotesToolbar' class='sitemapToolbar'>";
        pageNotesUi += "<div class='pluginNameHeader'>NOTES</div>";
        pageNotesUi += "<div class='pageNameHeader'></div>";

        pageNotesUi += "<div class='pageButtonHeader'>";

        pageNotesUi += "<a id='notesPreviousButton' title='Previous Page' class='sitemapToolbarButton prevPageButton'></a>";
        pageNotesUi += "<a id='notesNextButton' title='Next Page' class='sitemapToolbarButton nextPageButton'></a>";

        if($axure.document.configuration.showAnnotations == true) {
            pageNotesUi += "<a id='footnotesButton' title='Toggle Footnotes' class='sitemapToolbarButton'></a>";
        }

        pageNotesUi += "</div>";
        pageNotesUi += "</div>";
        pageNotesUi += "</div>";


        pageNotesUi += "<div id='pageNotesScrollContainer'>";
        pageNotesUi += "<div id='pageNotesContainer'>";
        pageNotesUi += "<div id='pageNotesEmptyState' class='emptyStateContainer'><div class='emptyStateTitle'>No notes for this page.</div><div class='emptyStateContent'>Notes added in Axure RP will appear here.</div><div class='dottedDivider'></div></div>";
        pageNotesUi += "<span id='pageNotesContent'></span>";
        pageNotesUi += "</div></div>";

        $('#pageNotesHost').html(pageNotesUi);
        updateContainerHeight();

        if(!$axure.document.configuration.showAnnotations) {
            $('#pageNotesHost .pageNameHeader').css('padding-right', '55px');
        }
    }

})();
