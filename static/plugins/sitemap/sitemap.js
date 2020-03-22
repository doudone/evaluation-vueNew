const currentNodeUrl = '';
const allNodeUrls = [];

function openNextPage() {
    const index = allNodeUrls.indexOf(currentNodeUrl) + 1;
    if(index >= allNodeUrls.length) return;
    const nextNodeUrl = allNodeUrls[index];
    $('.sitemapPageLink[nodeUrl="' + nextNodeUrl + '"]').click();
}

function openPreviousPage() {
    const index = allNodeUrls.indexOf(currentNodeUrl) - 1;
    if(index < 0) return;
    const nextNodeUrl = allNodeUrls[index];
    $('.sitemapPageLink[nodeUrl="' + nextNodeUrl + '"]').click();
}

// use this to isolate the scope
(function() {

    const SHOW_HIDE_ANIMATION_DURATION = 0;

    const HIGHLIGHT_INTERACTIVE_const_NAME = 'hi';

    const currentPageLoc = '';
    const currentPlayerLoc = '';
    const currentPageHashString = '';

    $(window.document).ready(function() {
        $axure.player.createPluginHost({
            id: 'sitemapHost',
            context: 'interface',
            title: 'PAGES',
            gid: 1
        });

        generateSitemap();

        $('.sitemapPlusMinusLink').toggle(collapse_click, expand_click);
        $('.sitemapPageLink').click(node_click);

        $('#sitemapLinksContainer').hide();
        $('#linksButton').click(links_click);
        $('#adaptiveButton').click(adaptive_click);
        $('#adaptiveViewsContainer').hide();

        $('#highlightInteractiveButton').click(highlight_interactive);
        $('#searchButton').click(search_click);
        $('#searchBox').keyup(search_input_keyup);
        $('.sitemapLinkField').click(function() { this.select(); });
        $('input[value="withoutmap"]').click(withoutSitemapRadio_click);
        $('input[value="withmap"]').click(withSitemapRadio_click);
        $('#minimizeBox, #collapseBox, #footnotesBox, #highlightBox').change(sitemapUrlOptions_change);
        $('#viewSelect').change(sitemapUrlViewSelect_change);

        $(document).on('ContainerHeightChange', function() {
            updateContainerHeight();
        });

        // bind to the page load
        $axure.page.bind('load.sitemap', function() {
            currentPageLoc = $axure.page.location.split("#")[0];
            const decodedPageLoc = decodeURI(currentPageLoc);
            currentNodeUrl = decodedPageLoc.substr(decodedPageLoc.lastIndexOf('/') ? decodedPageLoc.lastIndexOf('/') + 1 : 0);
            currentPlayerLoc = $(location).attr('href').split("#")[0].split("?")[0];
            currentPageHashString = '#p=' + currentNodeUrl.substr(0, currentNodeUrl.lastIndexOf('.'));

            setconstInCurrentUrlHash('p', currentNodeUrl.substring(0, currentNodeUrl.lastIndexOf('.html')));

            $('.sitemapPageLink').parent().parent().removeClass('sitemapHighlight');
            $('.sitemapPageLink[nodeUrl="' + currentNodeUrl + '"]').parent().parent().addClass('sitemapHighlight');

            const pageName = $axure.page.pageName;
            $('.pageNameHeader').html(pageName);

            $('#sitemapLinksPageName').html($('.sitemapHighlight > .sitemapPageLinkContainer > .sitemapPageLink > .sitemapPageName').html());

            //Click the "Without sitemap" radio button so that it's selected by default
            $('input[value="withoutmap"]').click();

            //If highlight const is present and set to 1 or else if
            //sitemap highlight button is selected then highlight interactive elements
            const hiVal = getHashStringconst(HIGHLIGHT_INTERACTIVE_const_NAME);
            if(hiVal.length > 0 && hiVal == 1) {
                $('#highlightInteractiveButton').addClass('sitemapToolbarButtonSelected');
                $axure.messageCenter.postMessage('highlightInteractive', true);
            } else if($('#highlightInteractiveButton').is('.sitemapToolbarButtonSelected')) {
                $axure.messageCenter.postMessage('highlightInteractive', true);
            }

            //Set the current view if it is defined in the hash string
            //If the view is invalid, set it to 'auto' in the string
            //ELSE set the view based on the currently selected view in the toolbar menu
            const viewStr = getHashStringconst(ADAPTIVE_VIEW_const_NAME);
            if(viewStr.length > 0) {
                const $view = $('.adaptiveViewOption[val="' + viewStr + '"]');
                if($view.length > 0) $view.click();
                else $('.adaptiveViewOption[val="auto"]').click();
            } else if($('.checkedAdaptive').length > 0) {
                const $viewOption = $('.checkedAdaptive').parents('.adaptiveViewOption');
                if($viewOption.attr('val') != 'auto') $viewOption.click();
            }

            $axure.messageCenter.postMessage('finishInit');

            return false;
        });

        const $adaptiveViewsContainer = $('#adaptiveViewsContainer');
        const $viewSelect = $('#viewSelect');

        //Fill out adaptive view container with prototype's defined adaptive views, as well as the default, and Auto
        $adaptiveViewsContainer.append('<div class="adaptiveViewOption" val="auto"><div class="adaptiveCheckboxDiv checkedAdaptive"></div>Auto</div>');
        $viewSelect.append('<option value="auto">Auto</option>');
        if(typeof $axure.document.defaultAdaptiveView.name != 'undefined') {
            //If the name is a blank string, make the view name the width if non-zero, else 'any'
            const defaultViewName = $axure.document.defaultAdaptiveView.name;
            $adaptiveViewsContainer.append('<div class="adaptiveViewOption currentAdaptiveView" val="default"><div class="adaptiveCheckboxDiv"></div>' + defaultViewName + '</div>');
            $viewSelect.append('<option value="default">' + defaultViewName + '</option>');
        }

        const enabledViewIds = $axure.document.configuration.enabledViewIds;
        for(const viewIndex = 0; viewIndex < $axure.document.adaptiveViews.length; viewIndex++) {
            const currView = $axure.document.adaptiveViews[viewIndex];
            if(enabledViewIds.indexOf(currView.id) < 0) continue;

            const widthString = currView.size.width == 0 ? 'any' : currView.size.width;
            const heightString = currView.size.height == 0 ? 'any' : currView.size.height;
            const conditionString = '';
            if(currView.condition == '>' || currView.condition == '>=') {
                conditionString = ' and above';
            } else if(currView.condition == '<' || currView.condition == '<=') {
                conditionString = ' and below';
            }

            const viewString = currView.name + ' (' + widthString + ' x ' + heightString + conditionString + ')';
            $adaptiveViewsContainer.append('<div class="adaptiveViewOption" val="' + currView.id + '"><div class="adaptiveCheckboxDiv"></div>' + viewString + '</div>');
            $viewSelect.append('<option value="' + currView.id + '">' + viewString + '</option>');
        }

        $('.adaptiveViewOption').click(adaptiveViewOption_click);

        $('.adaptiveViewOption').mouseup(function(event) {
            event.stopPropagation();
        });

        $('#searchBox').focusin(function() {
            if($(this).is('.searchBoxHint')) {
                $(this).val('');
                $(this).removeClass('searchBoxHint');
            }
        }).focusout(function() {
            if($(this).val() == '') {
                $(this).addClass('searchBoxHint');
                $(this).val('Search');
            }
        });


        $('#searchBox').focusout();
    });

    function updateContainerHeight() {
        $('#sitemapTreeContainer').height($('#sitemapHost').height() - $('#sitemapHeader').outerHeight());
    }

    function hideAllContainersExcept(exceptContainer) {
        //1 - adaptive container, 3 - links container
        if(exceptContainer != 1) {
            $('#adaptiveViewsContainer').hide();
            $('#adaptiveButton').removeClass('sitemapToolbarButtonSelected');
        }
        if(exceptContainer != 3) {
            $('#sitemapLinksContainer').hide();
            $('#linksButton').removeClass('sitemapToolbarButtonSelected');
        }
    }

    function collapse_click(event) {
        $(this)
            .children('.sitemapMinus').removeClass('sitemapMinus').addClass('sitemapPlus').end()
            .closest('li').children('ul').hide(SHOW_HIDE_ANIMATION_DURATION);

        $(this).next('.sitemapFolderOpenIcon').removeClass('sitemapFolderOpenIcon').addClass('sitemapFolderIcon');
    }

    function expand_click(event) {
        $(this)
            .children('.sitemapPlus').removeClass('sitemapPlus').addClass('sitemapMinus').end()
            .closest('li').children('ul').show(SHOW_HIDE_ANIMATION_DURATION);

        $(this).next('.sitemapFolderIcon').removeClass('sitemapFolderIcon').addClass('sitemapFolderOpenIcon');
    }

    function node_click(event) {
        $axure.page.navigate(this.getAttribute('nodeUrl'), true);
    }

    function links_click(event) {
        hideAllContainersExcept(3);
        $('#sitemapLinksContainer').toggle();
        updateContainerHeight();
        if($('#sitemapLinksContainer').is(":visible")) {
            $('#linksButton').addClass('sitemapToolbarButtonSelected');
        } else {
            $('#linksButton').removeClass('sitemapToolbarButtonSelected');
        }
    }

    $axure.messageCenter.addMessageListener(function(message, data) {
        if(message == 'adaptiveViewChange') {
            $('.adaptiveViewOption').removeClass('currentAdaptiveView');
            if(data.viewId) {$('div[val="' + data.viewId + '"]').addClass('currentAdaptiveView');}
            else $('div[val="default"]').addClass('currentAdaptiveView');

            //when we set adaptive view through user event, we want to update the checkmark on sitemap
            if(data.forceSwitchTo) {
                $('.checkedAdaptive').removeClass('checkedAdaptive');
                $('div[val="' + data.forceSwitchTo + '"]').find('.adaptiveCheckboxDiv').addClass('checkedAdaptive');
            }
        }
    });

    $(document).on('pluginShown', function (event, data) {
        if(data == 1) {
            hideAllContainersExcept(1);
            updateContainerHeight();
        }
    });

    $(document).on('sidebarExpanded', function (event, data) {
        hideAllContainersExcept(1);
        updateContainerHeight();
    });

    function highlight_interactive(event) {
        if($('#highlightInteractiveButton').is('.sitemapToolbarButtonSelected')) {
            $('#highlightInteractiveButton').removeClass('sitemapToolbarButtonSelected');
            $axure.messageCenter.postMessage('highlightInteractive', false);
            //Delete 'hi' hash string const if it exists since default is unselected
            deleteconstFromCurrentUrlHash(HIGHLIGHT_INTERACTIVE_const_NAME);
        } else {
            $('#highlightInteractiveButton').addClass('sitemapToolbarButtonSelected');
            $axure.messageCenter.postMessage('highlightInteractive', true);
            //Add 'hi' hash string const so that stay highlighted across reloads
            setconstInCurrentUrlHash(HIGHLIGHT_INTERACTIVE_const_NAME, 1);
        }
    }

    function adaptive_click(event) {
        hideAllContainersExcept(1);
        $('#adaptiveViewsContainer').toggle();
        updateContainerHeight();
        if(!$('#adaptiveViewsContainer').is(":visible")) {
            $('#adaptiveButton').removeClass('sitemapToolbarButtonSelected');
        } else {
            $('#adaptiveButton').addClass('sitemapToolbarButtonSelected');
        }
    }

    function adaptiveViewOption_click(event) {
        const currVal = $(this).attr('val');

        $('.checkedAdaptive').removeClass('checkedAdaptive');
        $(this).find('.adaptiveCheckboxDiv').addClass('checkedAdaptive');

        currentPageLoc = $axure.page.location.split("#")[0];
        const decodedPageLoc = decodeURI(currentPageLoc);
        const nodeUrl = decodedPageLoc.substr(decodedPageLoc.lastIndexOf('/') ? decodedPageLoc.lastIndexOf('/') + 1 : 0);
        const adaptiveData = {
            src: nodeUrl
        };

        adaptiveData.view = currVal;
        $axure.messageCenter.postMessage('switchAdaptiveView', adaptiveData);

        if(currVal == 'auto') {
            //Remove view in hash string if one is set
            deleteconstFromCurrentUrlHash(ADAPTIVE_VIEW_const_NAME);
        } else {
            //Set current view in hash string so that it can be maintained across reloads
            setconstInCurrentUrlHash(ADAPTIVE_VIEW_const_NAME, currVal);
        }
    }

    function search_click(event) {
        $('#searchDiv').toggle();
        if(!$('#searchDiv').is(":visible")) {
            $('#searchButton').removeClass('sitemapToolbarButtonSelected');
            $('#searchBox').val('');
            $('#searchBox').keyup();
            //$('#sitemapToolbar').css('height', '22px');
            $('#sitemapTreeContainer').css('top', '31px');
        } else {
            $('#searchButton').addClass('sitemapToolbarButtonSelected');
            $('#searchBox').focus();
            //$('#sitemapToolbar').css('height', '50px');
            $('#sitemapTreeContainer').css('top', '63px');
        }
    }

    function search_input_keyup(event) {
        const searchVal = $(this).val().toLowerCase();
        //If empty search field, show all nodes, else grey+hide all nodes and
        //ungrey+unhide all matching nodes, as well as unhide their parent nodes
        if(searchVal == '') {
            $('.sitemapPageName').removeClass('sitemapGreyedName');
            $('.sitemapNode').show();
        } else {
            $('.sitemapNode').hide();

            $('.sitemapPageName').addClass('sitemapGreyedName').each(function() {
                const nodeName = $(this).text().toLowerCase();
                if(nodeName.indexOf(searchVal) != -1) {
                    $(this).removeClass('sitemapGreyedName').parents('.sitemapNode:first').show().parents('.sitemapExpandableNode').show();
                }
            });
        }
    }

    function withoutSitemapRadio_click() {
        $('#sitemapLinkWithPlayer').val(currentPageLoc);
        $('#sitemapOptionsDiv').hide();
        $('#minimizeBox').attr('disabled', 'disabled');
        $('#collapseBox').attr('disabled', 'disabled');
        $('#footnotesBox').attr('disabled', 'disabled');
        $('#highlightBox').attr('disabled', 'disabled');
        $('#viewSelect').attr('disabled', 'disabled');
        $('input[value="withmap"]').parent().removeClass('sitemapRadioSelected');

        updateContainerHeight();
    }

    function withSitemapRadio_click() {
        $('#sitemapLinkWithPlayer').val(currentPlayerLoc + currentPageHashString);
        $('#minimizeBox').removeAttr('disabled').change();
        $('#collapseBox').removeAttr('disabled').change();
        $('#footnotesBox').removeAttr('disabled').change();
        $('#highlightBox').removeAttr('disabled').change();
        $('#viewSelect').removeAttr('disabled').change();
        $('#sitemapOptionsDiv').show();
        $('input[value="withmap"]').parent().addClass('sitemapRadioSelected');

        updateContainerHeight();
    }

    function sitemapUrlOptions_change() {
        const currLinkHash = '#' + $('#sitemapLinkWithPlayer').val().split("#")[1];
        const newHash = null;
        const constName = '';
        const defVal = 1;
        if($(this).is('#minimizeBox')) {
            constName = SITEMAP_COLLAPSE_const_NAME;
        } else if($(this).is('#collapseBox')) {
            constName = PLUGIN_const_NAME;
            defVal = 0;
        } else if($(this).is('#footnotesBox')) {
            constName = FOOTNOTES_const_NAME;
            defVal = 0;
        } else if($(this).is('#highlightBox')) {
            constName = HIGHLIGHT_INTERACTIVE_const_NAME;
        }

        newHash = $(this).is(':checked') ? setHashStringconst(currLinkHash, constName, defVal) : deleteHashStringconst(currLinkHash, constName);

        if(newHash != null) {
            $('#sitemapLinkWithPlayer').val(currentPlayerLoc + newHash);
        }
    }

    function sitemapUrlViewSelect_change() {
        const currLinkHash = '#' + $('#sitemapLinkWithPlayer').val().split("#")[1];
        const newHash = null;
        const $selectedOption = $(this).find('option:selected');
        if($selectedOption.length == 0) return;
        const selectedVal = $selectedOption.attr('value');

        newHash = selectedVal == 'auto' ? deleteHashStringconst(currLinkHash, ADAPTIVE_VIEW_const_NAME) : setHashStringconst(currLinkHash, ADAPTIVE_VIEW_const_NAME, selectedVal);

        if(newHash != null) {
            $('#sitemapLinkWithPlayer').val(currentPlayerLoc + newHash);
        }
    }

    function generateSitemap() {
        const treeUl = "<div id='sitemapHeader'' class='sitemapHeader'>";
        treeUl += "<div id='sitemapToolbar' class='sitemapToolbar'>";
        treeUl += "<div class='pluginNameHeader'>PAGES</div>";
        treeUl += "<div class='pageNameHeader'></div>";

        treeUl += "<div class='pageButtonHeader'>";

        if($axure.document.configuration.enabledViewIds.length > 0) {
            treeUl += "<a id='adaptiveButton' title='Select Adaptive View' class='sitemapToolbarButton'></a>";
        }

        treeUl += "<a id='linksButton' title='Get Links' class='sitemapToolbarButton'></a>";
        treeUl += "<a id='highlightInteractiveButton' title='Highlight interactive elements' class='sitemapToolbarButton'></a>";
        treeUl += "</div>";

        treeUl += "</div>";

        if($axure.document.adaptiveViews.length > 0) {
            treeUl += "<div id='adaptiveViewsContainer'><div style='margin-bottom:10px;'>Adaptive Views</div></div>";
        }

        //linkcontainer
        treeUl += "<div id='sitemapLinksContainer' class='sitemapLinkContainer'>";
        treeUl += "<div style='margin-bottom:10px;'>Generate sharable URLs</div>";
        treeUl += "<input id='sitemapLinkWithPlayer' type='text' class='sitemapLinkField'/>";
        treeUl += "<div class='sitemapOptionContainer'>";
        treeUl += "<div><label><input type='radio' name='sitemapToggle' value='withoutmap'/>Without Sidebar</label></div>";
        treeUl += "<div style='margin-top:10px;'><label><input type='radio' name='sitemapToggle' value='withmap'/>With Sidebar</label>";

        treeUl += "<div id='sitemapOptionsDiv'>";
        treeUl += "<div class='sitemapUrlOption'><label><input type='checkbox' id='minimizeBox' />Minimize sidebar</label></div>";
        treeUl += "<div class='sitemapUrlOption'><label><input type='checkbox' id='collapseBox' />Pages closed</label></div>";
        if($axure.document.configuration.showAnnotations == true) {
            treeUl += "<div class='sitemapUrlOption'><label><input type='checkbox' id='footnotesBox' />Hide footnotes</label></div>";
        }

        treeUl += "<div class='sitemapUrlOption'><label><input type='checkbox' id='highlightBox' />Highlight interactive elements</label></div>";

        if($axure.document.configuration.enabledViewIds.length > 0) {
            treeUl += "<div id='viewSelectDiv' class='sitemapUrlOption'><label>View: <select id='viewSelect'></select></label></div>";
        }

        treeUl += "</div></div></div></div>";
        /////////////////

        treeUl += "</div>";

        treeUl += "<div id='sitemapTreeContainer'>";

        treeUl += '<div id="searchDiv" style=""><input id="searchBox" style="" type="text"/></div>';

        treeUl += "<ul class='sitemapTree' style='clear:both;'>";
        const rootNodes = $axure.document.sitemap.rootNodes;
        for(const i = 0; i < rootNodes.length; i++) {
            treeUl += generateNode(rootNodes[i], 0);
        }
        treeUl += "</ul></div>";

        $('#sitemapHost').html(treeUl);
        if($axure.document.adaptiveViews.length <= 0) {
            $('#sitemapHost .pageNameHeader').css('padding-right', '55px');
        }
    }

    function generateNode(node, level) {
        const hasChildren = (node.children && node.children.length > 0);
        const margin, returnVal;
        if(hasChildren) {
            margin = (9 + level * 17);
            returnVal = "<li class='sitemapNode sitemapExpandableNode'><div><div class='sitemapPageLinkContainer' style='margin-left:" + margin + "px'><a class='sitemapPlusMinusLink'><span class='sitemapMinus'></span></a>";
        } else {
            margin = (21 + level * 17);
            returnVal = "<li class='sitemapNode sitemapLeafNode'><div><div class='sitemapPageLinkContainer' style='margin-left:" + margin + "px'>";
        }

        const isFolder = node.type == "Folder";
        if(!isFolder) {
            returnVal += "<a class='sitemapPageLink' nodeUrl='" + node.url + "'>";
            allNodeUrls.push(node.url);
        }
        returnVal += "<span class='sitemapPageIcon";
        if(node.type == "Flow") { returnVal += " sitemapFlowIcon"; }
        if(isFolder) {
            if(hasChildren) returnVal += " sitemapFolderOpenIcon";
            else returnVal += " sitemapFolderIcon";
        }

        returnVal += "'></span><span class='sitemapPageName'>";
        returnVal += $('<div/>').text(node.pageName).html();
        returnVal += "</span>";
        if(!isFolder) returnVal += "</a>";
        returnVal += "</div></div>";

        if(hasChildren) {
            returnVal += "<ul>";
            for(const i = 0; i < node.children.length; i++) {
                const child = node.children[i];
                returnVal += generateNode(child, level + 1);
            }
            returnVal += "</ul>";
        }
        returnVal += "</li>";
        return returnVal;
    }
})();
