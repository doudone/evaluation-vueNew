$axure.internal(function($ax) {
    let document = window.document;
    let _visibility = {};
    $ax.visibility = _visibility;

    let _defaultHidden = {};
    let _defaultLimbo = {};

    // ******************  Visibility and State Functions ****************** //

    let _isIdVisible = $ax.visibility.IsIdVisible = function(id) {
        return $ax.visibility.IsVisible(window.document.getElementById(id));
    };

    $ax.visibility.IsVisible = function(element) {
        //cannot use css('visibility') because that gets the effective visiblity
        //e.g. won't be able to set visibility on panels inside hidden panels
        return element.style.visibility != 'hidden';
    };

    $ax.visibility.SetIdVisible = function(id, visible) {
        $ax.visibility.SetVisible(window.document.getElementById(id), visible);
        // Hide lightbox if necessary
        if(!visible) {
            $jobj($ax.repeater.applySuffixToElementId(id, '_lightbox')).remove();
            $ax.flyoutManager.unregisterPanel(id, true);
        }
    };

    let _setAllVisible = function(query, visible) {
        for(let i = 0; i < query.length; i++) _visibility.SetVisible(query[i], visible);
    }

    $ax.visibility.SetVisible = function(element, visible) {
        //todo -- ahhhh! I really don't want to add this, I don't know why it is necessary (right now sliding panel state out then in then out breaks
        //and doesn't go hidden on the second out if we do not set display here.
        if(visible) {
            //hmmm i will need to remove the class here cause display will not be overwriten by set to ''
            if($(element).hasClass(HIDDEN_CLASS)) $(element).removeClass(HIDDEN_CLASS);
            if($(element).hasClass(UNPLACED_CLASS)) $(element).removeClass(UNPLACED_CLASS);
            element.style.display = '';
            element.style.visibility = 'visible';
        } else {
            element.style.display = 'none';
            element.style.visibility = 'hidden';
        }
    };

    let _setWidgetVisibility = $ax.visibility.SetWidgetVisibility = function (elementId, options) {
        let visible = $ax.visibility.IsIdVisible(elementId);
        // If limboed, just fire the next action then leave.
        if(visible == options.value || _limboIds[elementId]) {
            if(!_limboIds[elementId]) options.onComplete && options.onComplete();
            $ax.action.fireAnimationFromQueue(elementId, $ax.action.queueTypes.fade);
            return;
        }

        options.containInner = true;
        let query = $jobj(elementId);
        let parentId = query.parent().attr('id');
        let axObj = $obj(elementId);
        let preserveScroll = false;
        let isPanel = $ax.public.fn.IsDynamicPanel(axObj.type);
        let isLayer = $ax.public.fn.IsLayer(axObj.type);
        if(isPanel || isLayer) {
            //if dp has scrollbar, save its scroll position
            if(isPanel && axObj.scrollbars != 'none') {
                let shownState = $ax.dynamicPanelManager.getShownState(elementId);
                preserveScroll = true;
                //before hiding, try to save scroll location
                if(!options.value && shownState) {
                    DPStateAndScroll[elementId] = {
                        shownId: shownState.attr('id'),
                        left: shownState.scrollLeft(),
                        top: shownState.scrollTop()
                    }
                }
            }

            _pushContainer(elementId, isPanel);
            if(isPanel && !options.value) _tryResumeScrollForDP(elementId);
            let complete = options.onComplete;
            options.onComplete = function () {
                if(complete) complete();
                _popContainer(elementId, isPanel);
                //after showing dp, restore the scoll position
                if(isPanel && options.value) _tryResumeScrollForDP(elementId, true);
            }
            options.containerExists = true;
        }
        _setVisibility(parentId, elementId, options, preserveScroll);

        //set the visibility of the annotation box as well if it exists
        let ann = document.getElementById(elementId + "_ann");
        if(ann) _visibility.SetVisible(ann, options.value);

        //set ref visibility for ref of flow shape, if that exists
        let ref = document.getElementById(elementId + '_ref');
        if(ref) _visibility.SetVisible(ref, options.value);
    };

    let _setVisibility = function(parentId, childId, options, preserveScroll) {
        let wrapped = $jobj(childId);



        //easing: easingOut


        let completeTotal = 1;
        let visible = $ax.visibility.IsIdVisible(childId);

        if(visible == options.value) {
            options.onComplete && options.onComplete();
            $ax.action.fireAnimationFromQueue(childId, $ax.action.queueTypes.fade);
            return;
        }

        let child = $jobj(childId);
        let size = options.size || (options.containerExists ? $(child.children()[0]) : child);

        let isIdFitToContent = $ax.dynamicPanelManager.isIdFitToContent(parentId);
        //fade and resize won't work together when there is a container... but we still needs the container for fit to content DPs
        let needContainer = options.easing && options.easing != 'none' && (options.easing != 'fade' || isIdFitToContent);
        let cullPosition = options.cull ? options.cull.css('position') : '';
        let containerExists = options.containerExists;

        let isFullWidth = $ax.dynamicPanelManager.isPercentWidthPanel($obj(childId));

        // If fixed fit to content panel, then we must set size on it. It will be size of 0 otherwise, because container in it is absolute position.
        let needSetSize = false;
        let sizeObj = {};
        if(needContainer) {
            let sizeId = '';
            if($ax.dynamicPanelManager.isIdFitToContent(childId)) sizeId = childId;
            else {
                let panelId = $ax.repeater.removeSuffixFromElementId(childId)[0];
                if($ax.dynamicPanelManager.isIdFitToContent(panelId)) sizeId = panelId;
            }

            if (sizeId) {
                needSetSize = true;

                sizeObj = $jobj(sizeId);
                let newSize = options.cull || sizeObj;
                let newAxSize = $ax('#' + newSize.attr('id'));
                sizeObj.width(newAxSize.width());
                sizeObj.height(newAxSize.height());
            }
        }

        let wrappedOffset = { left: 0, top: 0 };
        let visibleWrapped = wrapped;
        if(needContainer) {
            let childObj = $obj(childId);
            if (options.cull) {
                let axCull = $ax('#' + options.cull.attr('id'));
                let containerWidth = axCull.width();
                let containerHeight = axCull.height();
            } else {
                if(childObj && ($ax.public.fn.IsLayer(childObj.type))) {// || childObj.generateCompound)) {
                    let boundingRectangle = $ax.public.fn.getWidgetBoundingRect(childId);
                    wrappedOffset.left = boundingRectangle.left;
                    wrappedOffset.top = boundingRectangle.top;
                    containerWidth = boundingRectangle.width;
                    containerHeight = boundingRectangle.height;
                } else {
                    containerWidth = $ax('#' + childId).width();
                    containerHeight = $ax('#' + childId).height();
                }
            }

            let containerId = $ax.visibility.applyWidgetContainer(childId);
//            let container = _makeContainer(containerId, options.cull || boundingRectangle, isFullWidth, options.easing == 'flip', wrappedOffset, options.containerExists);
            let container = _makeContainer(containerId, containerWidth, containerHeight, isFullWidth, options.easing == 'flip', wrappedOffset, options.containerExists);

            if(options.containInner) {
                wrapped = _wrappedChildren(containerExists ? $(child.children()[0]) : child);

                // Filter for visibile wrapped children
                visibleWrapped = [];
                for (let i = 0; i < wrapped.length; i++) if($ax.visibility.IsVisible(wrapped[i])) visibleWrapped.push(wrapped[i]);
                visibleWrapped = $(visibleWrapped);

                completeTotal = visibleWrapped.length;
                if(!containerExists) container.prependTo(child);

                // Offset items if necessary
                if(!containerExists && (wrappedOffset.left != 0 || wrappedOffset.top != 0)) {
                    for(let i = 0; i < wrapped.length; i++) {
                        let inner = $(wrapped[i]);
                        inner.css('left', $ax.getNumFromPx(inner.css('left')) - wrappedOffset.left);
                        inner.css('top', $ax.getNumFromPx(inner.css('top')) - wrappedOffset.top);
                        // Parent layer is now size 0, so have to have to use conatiner since it's the real size.
                        //  Should we use container all the time? This may make things easier for fit panels too.
                        size = container;
                    }
                }
            } else if(!containerExists) container.insertBefore(child);
            if(!containerExists) wrapped.appendTo(container);

            if (options.value && options.containInner) {
                //has to set children first because flip to show needs childerns invisible
                _setAllVisible(visibleWrapped, false);
                _updateChildAlignment(childId);
                _setAllVisible(child, true);
            }
        }

        let completeCount = 0;
        let onComplete = function () {
            completeCount++;
            if (needContainer && completeCount == completeTotal) {
                if ($ax.public.fn.isCompoundVectorHtml(container.parent()[0])) {
                    wrappedOffset.left = $ax.getNumFromPx(container.css('left'));
                    wrappedOffset.top = $ax.getNumFromPx(container.css('top'));
                }

                if (options.containInner && !containerExists && (wrappedOffset.left != 0 || wrappedOffset.top != 0)) {
                    for (i = 0; i < wrapped.length; i++) {
                        inner = $(wrapped[i]);
                        //if ($ax.public.fn.isCompoundVectorComponentHtml(inner[0])) break;
                        inner.css('left', $ax.getNumFromPx(inner.css('left')) + wrappedOffset.left);
                        inner.css('top', $ax.getNumFromPx(inner.css('top')) + wrappedOffset.top);
                    }
                }

                if(options.containInner && !options.value) {
                    _setAllVisible(child, false);
                    _setAllVisible(visibleWrapped, true);
                }

                if(containerExists) {
                    if(!options.settingChild) container.css('position', 'relative;');
                } else {
                    wrapped.insertBefore(container);
                    container.remove();
                }
                //child.css(css);

                // Any text set or other things that triggered alignment updating during animation can happen now.
                if(options.containInner) {
                    for(i = 0; i < wrapped.length; i++) $ax.style.checkAlignmentQueue($(wrapped[i]).attr('id'));
                }

                if(childObj && $ax.public.fn.IsDynamicPanel(childObj.type) && window.modifiedDynamicPanleParentOverflowProp) {
                    child.css('overflow', 'hidden');
                    window.modifiedDynamicPanleParentOverflowProp = false;
                }
            }

            if(!needContainer || completeTotal == completeCount) {
                if(options.cull) options.cull.css('position', cullPosition);
                if(needSetSize) {
                    sizeObj.css('width', 'auto');
                    sizeObj.css('height', 'auto');
                }
                options.onComplete && options.onComplete();

                if(options.fire) {
                    $ax.event.raiseSyntheticEvent(childId, options.value ? 'onShow' : 'onHide');
                    $ax.action.fireAnimationFromQueue(childId, $ax.action.queueTypes.fade);
                }
            }
        };

        // Nothing actually being animated, all wrapped elements invisible
        if(!visibleWrapped.length) {
            if(!options.easing || options.easing == 'none') {
                $ax.visibility.SetIdVisible(childId, options.value);
                completeTotal = 1;
                onComplete();
            } else {
                window.setTimeout(function() {
                    completeCount = completeTotal - 1;
                    onComplete();
                },options.duration);
            }

            return;
        }

        if(!options.easing || options.easing == 'none') {
            $ax.visibility.SetIdVisible(childId, options.value);
            completeTotal = 1;
            onComplete();
        } else if(options.easing == 'fade') {
            if(options.value) {
                if(preserveScroll) {
                    visibleWrapped.css('opacity', 0);
                    visibleWrapped.css('visibility', 'visible');
                    visibleWrapped.css('display', 'block');
                    //was hoping we could just use fadein here, but need to set display before set scroll position
                    _tryResumeScrollForDP(childId);
                    visibleWrapped.animate({ opacity: 1 }, {
                        duration: options.duration,
                        easing: 'swing',
                        queue: false,
                        complete: function() {
                            $ax.visibility.SetIdVisible(childId, true);
                            visibleWrapped.css('opacity', '');
                            onComplete();
                        }
                    });
                } else {
                    // Can't use $ax.visibility.SetIdVisible, because we only want to set visible, we don't want to display, fadeIn will handle that.
                    visibleWrapped.css('visibility', 'visible');
                    visibleWrapped.fadeIn({
                        queue: false,
                        duration: options.duration,
                        complete: onComplete
                    });
                }
            } else {
                // Fading here is being strange...
                visibleWrapped.animate({ opacity: 0 }, { duration: options.duration, easing: 'swing', queue: false, complete: function() {
                    $ax.visibility.SetIdVisible(childId, false);
                    visibleWrapped.css('opacity', '');

                    onComplete();
                }});
            }
        } else if (options.easing == 'flip') {
            //this container will hold
            let innerContainer = $('<div></div>');
            innerContainer.attr('id', containerId + "_inner");
            innerContainer.data('flip', options.direction == 'left' || options.direction == 'right' ? 'y' : 'x');
            innerContainer.css({
                position: 'relative',
                'width': containerWidth,
                'height': containerHeight
            });

            innerContainer.appendTo(container);
            wrapped.appendTo(innerContainer);

            if(childObj && $ax.public.fn.IsDynamicPanel(childObj.type)) {
              let containerDiv = child;
            }
            else containerDiv = parentId ? $jobj(parentId) : child.parent();

            completeTotal = 1;
            let flipdegree;
            let requestAnimFrame = window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame || window.msRequestAnimationFrame ||
                function (callback) {
                    window.setTimeout(callback, 1000 / 60);
                };

            let originForUpOrDown = '100% ' + containerHeight / 2 + 'px';
            if(options.value) {
                //options.value == true means in or show, note to get here, the element must be currently hidden
                //to show, we need to first flip it 180deg without animation
                switch(options.direction) {
                    case 'right':
                    case 'left':
                        _setRotateTransformation(innerContainer, 'rotateY(180deg)');
                    flipdegree = options.direction === 'right' ? 'rotateY(360deg)' : 'rotateY(0deg)';
                    break;
                    case 'up':
                    case 'down':
                    innerContainer.css({
                        '-webkit-transform-origin': originForUpOrDown,
                        '-ms-transform-origin': originForUpOrDown,
                        'transform-origin': originForUpOrDown,
                    });
                    _setRotateTransformation(innerContainer, 'rotateX(180deg)');
                    flipdegree = options.direction === 'up' ? 'rotateX(360deg)' : 'rotateX(0deg)';
                    break;
                }

                let onFlipShowComplete = function() {
                    $ax.visibility.SetIdVisible(childId, true);

                    wrapped.insertBefore(innerContainer);
                    innerContainer.remove();

                    onComplete();
                };

                innerContainer.css({
                    '-webkit-backface-visibility': 'hidden',
                    'backface-visibility': 'hidden'
                });

                child.css({
                    'display': '',
                    'visibility': 'visible'
                });

                visibleWrapped.css({
                    'display': '',
                    'visibility': 'visible'
                });

                innerContainer.css({
                    '-webkit-transition-duration': options.duration + 'ms',
                    'transition-duration': options.duration + 'ms'
                });

                if(preserveScroll) _tryResumeScrollForDP(childId);
                requestAnimFrame(function () {
                    _setRotateTransformation(innerContainer, flipdegree, containerDiv, onFlipShowComplete, options.duration);
                });
            } else { //hide or out
                switch(options.direction) {
                    case 'right':
                    case 'left':
                        flipdegree = options.direction === 'right' ? 'rotateY(180deg)' : 'rotateY(-180deg)';
                        break;
                    case 'up':
                    case 'down':
                        //_setRotateTransformation(wrapped, 'rotateX(0deg)');
                        innerContainer.css({
                            '-webkit-transform-origin': originForUpOrDown,
                            '-ms-transform-origin': originForUpOrDown,
                            'transform-origin': originForUpOrDown,
                        });
                        flipdegree = options.direction === 'up' ? 'rotateX(180deg)' : 'rotateX(-180deg)';
                    break;
                }

                let onFlipHideComplete = function() {
                    wrapped.insertBefore(innerContainer);
                    $ax.visibility.SetIdVisible(childId, false);

                    innerContainer.remove();

                    onComplete();
                };

                innerContainer.css({
                    '-webkit-backface-visibility': 'hidden',
                    'backface-visibility': 'hidden',
                    '-webkit-transition-duration': options.duration + 'ms',
                    'transition-duration': options.duration + 'ms'
                });

                if(preserveScroll) _tryResumeScrollForDP(childId);
                requestAnimFrame(function () {
                    _setRotateTransformation(innerContainer, flipdegree, containerDiv, onFlipHideComplete, options.duration);
                });
            }
        } else {
            // Because the move is gonna fire on annotation and ref too, need to update complete total
            completeTotal = $addAll(visibleWrapped, childId).length;
            if(options.value) {
                _slideStateIn(childId, childId, options, size, false, onComplete, visibleWrapped, preserveScroll);
            } else {
                let tops = [];
                let lefts = [];
                for(let i = 0; i < visibleWrapped.length; i++) {
                    let currWrapped = $(visibleWrapped[i]);
                    tops.push(currWrapped.css('top'));
                    lefts.push(currWrapped.css('left'));
                }

                let onOutComplete = function () {
                    //bring back SetIdVisible on childId for hiding lightbox
                    $ax.visibility.SetIdVisible(childId, false);
                    for(i = 0; i < visibleWrapped.length; i++) {
                        currWrapped = $(visibleWrapped[i]);
                        $ax.visibility.SetIdVisible(currWrapped.attr('id'), false);
                        currWrapped.css('top', tops[i]);
                        currWrapped.css('left', lefts[i]);
                    }
                    onComplete();
                };
                _slideStateOut(size, childId, options, onOutComplete, visibleWrapped);
            }
        }
        // If showing, go through all rich text objects inside you, and try to redo alignment of them
        if(options.value && !options.containInner) {
            _updateChildAlignment(childId);
        }
    };

    let _updateChildAlignment = function(childId) {
        let descendants = $jobj(childId).find('*');
        for(let i = 0; i < descendants.length; i++) {
            let decendantId = descendants[i].id;
            // This check is probably redundant? UpdateTextAlignment should ignore any text objects that haven't set the vAlign yet.
            if($ax.getTypeFromElementId(decendantId) != 'richTextPanel') continue;
            $ax.style.updateTextAlignmentForVisibility(decendantId);
        }
    };

    let _wrappedChildren = function (child) {
        return child.children();
        //let children = child.children();
        //let valid = [];
        //for(let i = 0; i < children.length; i++) if($ax.visibility.IsVisible(children[i])) valid.push(children[i]);
        //return $(valid);
    };

    let _setRotateTransformation = function(elementsToSet, transformValue, elementParent, flipCompleteCallback, flipDurationMs) {
        if(flipCompleteCallback) {
            //here we didn't use 'transitionend' event to fire callback
            //when show/hide on one element, changing transition property will stop the event from firing
            window.setTimeout(flipCompleteCallback, flipDurationMs);
        }

        elementsToSet.css({
            '-webkit-transform': transformValue,
            '-moz-transform': transformValue,
            '-ms-transform': transformValue,
            '-o-transform': transformValue,
            'transform': transformValue
        });

        //when deal with dynamic panel, we need to set it's parent's overflow to visible to have the 3d effect
        //NOTE: we need to set this back when both flips finishes in DP, to prevents one animation finished first and set this back
        if(elementParent && elementParent.css('overflow') === 'hidden') {
            elementParent.css('overflow', 'visible');
            window.modifiedDynamicPanleParentOverflowProp = true;
        }
    };

    $ax.visibility.GetPanelState = function(id) {
        let children = $ax.visibility.getRealChildren($jobj(id).children());
        for(let i = 0; i < children.length; i++) {
            if(children[i].style && $ax.visibility.IsVisible(children[i])) return children[i].id;
        }
        return '';
    };

    let containerCount = {};
    $ax.visibility.SetPanelState = function(id, stateId, easingOut, directionOut, durationOut, easingIn, directionIn, durationIn, showWhenSet) {
        let show = !$ax.visibility.IsIdVisible(id) && showWhenSet;
        if(show) $ax.visibility.SetIdVisible(id, true);

        // Exit here if already at desired state.
        if($ax.visibility.IsIdVisible(stateId)) {
            if(show) $ax.event.raiseSyntheticEvent(id, 'onShow');
            $ax.action.fireAnimationFromQueue(id, $ax.action.queueTypes.setState);
            return;
        }

        _pushContainer(id, true);

        let state = $jobj(stateId);
        let oldStateId = $ax.visibility.GetPanelState(id);
        let oldState = $jobj(oldStateId);
        //pin to browser
        $ax.dynamicPanelManager.adjustFixed(id, oldState.width(), oldState.height(), state.width(), state.height());

        _bringPanelStateToFront(id, stateId);

        let fitToContent = $ax.dynamicPanelManager.isIdFitToContent(id);
        let resized = false;
        if(fitToContent) {
            // Set resized
            resized = state.width() != oldState.width() || state.height() != oldState.height();
        }

        //edge case for sliding
        let movement = (directionOut == 'left' || directionOut == 'up' || state.children().length == 0) && oldState.children().length != 0 ? oldState : state;
        let onCompleteCount = 0;
        let onComplete = function () {
            //move this call from _setVisibility() for animate out.
            //Because this will make the order of dp divs consistence: the showing panel is always in front after both animation finished
            //tested in the cases where one panel is out/show slower/faster/same time/instantly.
            _bringPanelStateToFront(id, stateId);

            if (window.modifiedDynamicPanleParentOverflowProp) {
                let parent = id ? $jobj(id) : child.parent();
                parent.css('overflow', 'hidden');
                window.modifiedDynamicPanleParentOverflowProp = false;
            }

            $ax.dynamicPanelManager.fitParentPanel(id);
            $ax.dynamicPanelManager.updatePanelPercentWidth(id);
            $ax.dynamicPanelManager.updatePanelContentPercentWidth(id);
            $ax.action.fireAnimationFromQueue(id, $ax.action.queueTypes.setState);
            $ax.event.raiseSyntheticEvent(id, "onPanelStateChange");
            $ax.event.leavingState(oldStateId);
            _popContainer(id, true);
        };
        // Must do state out first, so if we cull by new state, location is correct
        _setVisibility(id, oldStateId, {
            value: false,
            easing: easingOut,
            direction: directionOut,
            duration: durationOut,
            containerExists: true,
            onComplete: function() {
//                if(easingIn !== 'flip') _bringPanelStateToFront(id, stateId);
                if (++onCompleteCount == 2) onComplete();
            },
            settingChild: true,
            size: movement,
            //cull for
            cull: easingOut == 'none' || state.children().length == 0 ? oldState : state
        });

        _setVisibility(id, stateId, {
            value: true,
            easing: easingIn,
            direction: directionIn,
            duration: durationIn,
            containerExists: true,
            onComplete: function () {
//                if (easingIn === 'flip') _bringPanelStateToFront(id, stateId);
                if (++onCompleteCount == 2) onComplete();
            },
            settingChild: true,
            //size for offset
            size: movement
        });

        if(show) $ax.event.raiseSyntheticEvent(id, 'onShow');
        if(resized) $ax.event.raiseSyntheticEvent(id, 'onResize');
    };

    let containedFixed = {};
    let _pushContainer = _visibility.pushContainer = function(id, panel) {
        let count = containerCount[id];
        if(count) containerCount[id] = count + 1;
        else {
            let jobj = $jobj(id);
            let children = jobj.children();
            let css = {
                position: 'relative',
                top: 0,
                left: 0
            };

            if(!panel) {
                let boundingRect = $axure.fn.getWidgetBoundingRect(id);
                css.top = boundingRect.top;
                css.left = boundingRect.left;
            }

            let container = $('<div></div>');
            container.attr('id', $ax.visibility.applyWidgetContainer(id));
            container.css(css);
            //container.append(jobj.children());
            jobj.append(container);
            containerCount[id] = 1;

            // Panel needs to wrap children
            if(panel) {
                for(let i = 0; i < children.length; i++) {
                    let child = $(children[i]);
                    let childContainer = $('<div></div>');
                    childContainer.attr('id', $ax.visibility.applyWidgetContainer(child.attr('id')));
                    childContainer.css(css);
                    child.after(childContainer);
                    childContainer.append(child);
                    container.append(childContainer);
                }
            } else {
                let focus = _getCurrFocus();

                // Layer needs to fix top left
                let childIds = $ax('#' + id).getChildren()[0].children;
                for(let i = 0; i < childIds.length; i++) {
                    let childId = childIds[i];
                    let childObj = $jobj(childId);
                    let fixedInfo = $ax.dynamicPanelManager.getFixedInfo(childId);
                    if(fixedInfo.fixed) {
                        let axObj = $ax('#' + childId);
                        let left = axObj.left();
                        let top = axObj.top();
                        containedFixed[childId] = { left: left, top: top, fixed: fixedInfo };
                        childObj.css('left', left);
                        childObj.css('top', top);
                        childObj.css('margin-left', 0);
                        childObj.css('margin-top', 0);
                        childObj.css('right', 'auto');
                        childObj.css('bottom', 'auto');
                        childObj.css('position', 'absolute');
                    }
                    let cssChange = {
                        left: '-=' + css.left,
                        top: '-=' + css.top
                    };
                    if($ax.getTypeFromElementId(childId) == $ax.constants.LAYER_TYPE) {
                        _pushContainer(childId, false);
                        $ax.visibility.applyWidgetContainer(childId, true).css(cssChange);
                    } else {
                        //if ($ax.public.fn.isCompoundVectorHtml(jobj[0])) {
                        //    let grandChildren = jobj[0].children;
                        //    //while (grandChildren.length > 0 && grandChildren[0].id.indexOf('container') >= 0) grandChildren = grandChildren[0].children;

                        //    for (let j = 0; j < grandChildren.length; j++) {
                        //        let grandChildId = grandChildren[j].id;
                        //        if (grandChildId.indexOf(childId + 'p') >= 0 || grandChildId.indexOf('_container') >= 0) $jobj(grandChildId).css(cssChange);
                        //    }
                        //} else
                        // Need to include ann and ref in move.
                        childObj = $addAll(childObj, childId);
                        childObj.css(cssChange);
                    }

                    container.append(childObj);
                }
                _setCurrFocus(focus);
            }
        }
    };

    let _popContainer = _visibility.popContainer = function(id, panel) {
        let count = containerCount[id];
        if(!count) return;
        count--;
        containerCount[id] = count;
        if(count != 0) return;

        let jobj = $jobj(id);
        let container = $ax.visibility.applyWidgetContainer(id, true);

        // If layer is at bottom or right of page, unwrapping could change scroll by temporarily reducting page size.
        //  To avoid this, we let container persist on page, with the size it is at this point, and don't remove container completely
        //  until the children are back to their proper locations.
        let size = $ax('#' + id);
        container.css('width', size.width());
        container.css('height', size.height());
        let focus = _getCurrFocus();
        jobj.append(container.children());
        _setCurrFocus(focus);
        $('body').append(container);

        // Layer doesn't have children containers to clean up
        if(panel) {
            let children = jobj.children();
            for(let i = 0; i < children.length; i++) {
                let childContainer = $(children[i]);
                let child = $(childContainer.children()[0]);
                childContainer.after(child);
                childContainer.remove();
            }
        } else {
            let left = container.css('left');
            let top = container.css('top');
            let childIds = $ax('#' + id).getChildren()[0].children;
            for (let i = 0; i < childIds.length; i++) {
                let childId = childIds[i];
                let cssChange = {
                    left: '+=' + left,
                    top: '+=' + top
                };
                if($ax.getTypeFromElementId(childId) == $ax.constants.LAYER_TYPE) {
                    $ax.visibility.applyWidgetContainer(childId, true).css(cssChange);
                    _popContainer(childId, false);
                } else {
                    let childObj = $jobj(childId);
                //    if ($ax.public.fn.isCompoundVectorHtml(jobj[0])) {
                //        let grandChildren = jobj[0].children;
                //        //while (grandChildren.length > 0 && grandChildren[0].id.indexOf('container') >= 0) grandChildren = grandChildren[0].children;
                //        for (let j = 0; j < grandChildren.length; j++) {
                //            let grandChildId = grandChildren[j].id;
                //            if (grandChildId.indexOf(childId + 'p') >= 0 || grandChildId.indexOf('_container') >= 0) $jobj(grandChildId).css(cssChange);
                //        }
                //} else
                    let allObjs = $addAll(childObj, childId); // Just include other objects for initial css. Fixed panels need to be dealt with separately.
                    allObjs.css(cssChange);

                    let fixedInfo = containedFixed[childId];
                    if(fixedInfo) {
                        delete containedFixed[childId];

                        childObj.css('position', 'fixed');
                        let deltaX = $ax.getNumFromPx(childObj.css('left')) - fixedInfo.left;
                        let deltaY = $ax.getNumFromPx(childObj.css('top')) - fixedInfo.top;

                        fixedInfo = fixedInfo.fixed;
                        if(fixedInfo.horizontal == 'left') childObj.css('left', fixedInfo.x + deltaX);
                        else if(fixedInfo.horizontal == 'center') {
                            childObj.css('left', '50%');
                            childObj.css('margin-left', fixedInfo.x + deltaX);
                        } else {
                            childObj.css('left', 'auto');
                            childObj.css('right', fixedInfo.x - deltaX);
                        }

                        if(fixedInfo.vertical == 'top') childObj.css('top', fixedInfo.y + deltaY);
                        else if(fixedInfo.vertical == 'middle') {
                            childObj.css('top', '50%');
                            childObj.css('margin-top', fixedInfo.y + deltaY);
                        } else {
                            childObj.css('top', 'auto');
                            childObj.css('bottom', fixedInfo.y - deltaY);
                        }

                        $ax.dynamicPanelManager.updatePanelPercentWidth(childId);
                        $ax.dynamicPanelManager.updatePanelContentPercentWidth(childId);

                    }
                }
            }
        }
        container.remove();
    };

    let _getCurrFocus = function() {
        return window.lastFocusedClickable && window.lastFocusedClickable.id;
    }

    let _setCurrFocus = function(id) {
        if(id) {
            $jobj(id).focus();
        }
    }

    //use this to save & restore DP's scroll position when show/hide
    //key => dp's id (not state's id, because it seems we can change state while hiding)
    //value => first state's id & scroll position
    //we only need to store one scroll position for one DP, and remove the key after shown.
    let DPStateAndScroll = {}
    let _tryResumeScrollForDP = function (dpId, deleteId) {
        let scrollObj = DPStateAndScroll[dpId];
        if(scrollObj) {
            let shownState = document.getElementById(scrollObj.shownId);
            if(scrollObj.left) shownState.scrollLeft = scrollObj.left;
            if(scrollObj.top) shownState.scrollTop = scrollObj.top;
            if(deleteId) delete DPStateAndScroll[dpId];
        }
    };
//    let _makeContainer = function (containerId, rect, isFullWidth, isFlip, offset, containerExists) {
    let _makeContainer = function (containerId, width, height, isFullWidth, isFlip, offset, containerExists) {
        let container ;
        if(containerExists) {
          container = $jobj(containerId);
        }
        else {
            container = $('<div></div>');
            container.attr('id', containerId);
        }
        let css = {
            position: 'absolute',
            width: width,
            height: height,
        };

        if(!containerExists) {
            // If container exists, may be busy updating location. Will init and update it correctly.
            css.top = offset.top;
            css.left = offset.left;
        }


        if(isFlip) {
            css.perspective = '800px';
            css.webkitPerspective = "800px";
            css.mozPerspective = "800px";
        } else css.overflow = 'hidden';

        //perspective on container will give us 3d effect when flip
        //if(!isFlip) css.overflow = 'hidden';

        // Rect should be a jquery not axquery obj
        //_getFixedCss(css, rect.$ ? rect.$() : rect, fixedInfo, isFullWidth);

        container.css(css);
        return container;
    };

    let CONTAINER_SUFFIX = _visibility.CONTAINER_SUFFIX = '_container';
    let CONTAINER_INNER = CONTAINER_SUFFIX + '_inner';
    _visibility.getWidgetFromContainer = function(id) {
        let containerIndex = id.indexOf(CONTAINER_SUFFIX);
        if(containerIndex == -1) return id;
        return id.substr(0, containerIndex) + id.substr(containerIndex + CONTAINER_SUFFIX.length);
    };

    // Apply container to widget id if necessary.
    // returnJobj: True if you want the jquery object rather than id returned
    // skipCheck: True if you want the query returned reguardless of container existing
    // checkInner: True if inner container should be checked
    _visibility.applyWidgetContainer = function (id, returnJobj, skipCheck, checkInner) {
        // If container exists, just return (return query if requested)
        if(id.indexOf(CONTAINER_SUFFIX) != -1) return returnJobj ? $jobj(id) : id;

        // Get desired id, and return it if query is not desired
        let containerId = $ax.repeater.applySuffixToElementId(id, checkInner ? CONTAINER_INNER : CONTAINER_SUFFIX);
        if(!returnJobj) return containerId;

        // If skipping check or container exists, just return innermost container requested
        let container = $jobj(containerId);
        if(skipCheck || container.length) return container;
        // If inner container was not checked, then no more to check, return query for widget
        if(!checkInner) return $jobj(id);

        // If inner container was checked, check for regular container still
        container = $jobj($ax.repeater.applySuffixToElementId(id, CONTAINER_SUFFIX));
        return container.length ? container : $jobj(id);
    };

    _visibility.isContainer = function(id) {
        return id.indexOf(CONTAINER_SUFFIX) != -1;
    };

    _visibility.getRealChildren = function(query) {
        while(query.length && $(query[0]).attr('id').indexOf(CONTAINER_SUFFIX) != -1) query = query.children();
        return query;
    };

    let _getFixedCss = function(css, rect, fixedInfo, isFullWidth) {
        // todo: **mas** make sure this is ok
        if(fixedInfo.fixed) {
            css.position = 'fixed';

            if(fixedInfo.horizontal == 'left') css.left = fixedInfo.x;
            else if(fixedInfo.horizontal == 'center') {
                css.left = isFullWidth ? '0px' : '50%';
                css['margin-left'] = fixedInfo.x;
            } else if(fixedInfo.horizontal == 'right') {
                css.left = 'auto';
                css.right = fixedInfo.x;
            }

            if(fixedInfo.vertical == 'top') css.top = fixedInfo.y;
            else if(fixedInfo.vertical == 'middle') {
                css.top = '50%';
                css['margin-top'] = fixedInfo.y;
            } else if(fixedInfo.vertical == 'bottom') {
                css.top = 'auto';
                css.bottom = fixedInfo.y;
            }
        } else {
            css.left = Number(rect.css('left').replace('px', '')) || 0;
            css.top = Number(rect.css('top').replace('px', '')) || 0;
        }
    };

    let _slideStateOut = function (container, stateId, options, onComplete, jobj) {
        let directionOut = options.direction;
        let axObject = $ax('#' + container.attr('id'));
        let width = axObject.width();
        let height = axObject.height();

        if(directionOut == "right") {
            $ax.move.MoveWidget(stateId, width, 0, options, false, onComplete, false, jobj);
        } else if(directionOut == "left") {
            $ax.move.MoveWidget(stateId, -width, 0, options, false, onComplete, false, jobj);
        } else if(directionOut == "up") {
            $ax.move.MoveWidget(stateId, 0, -height, options, false, onComplete, false, jobj);
        } else if(directionOut == "down") {
            $ax.move.MoveWidget(stateId, 0, height, options, false, onComplete, false, jobj);
        }
    };

    let _slideStateIn = function (id, stateId, options, container, makePanelVisible, onComplete, jobj, preserveScroll) {
        let directionIn = options.direction;
        let axObject = $ax('#' +container.attr('id'));
        let width = axObject.width();
        let height = axObject.height();

        for(let i = 0; i < jobj.length; i++) {
            let child = $(jobj[i]);
            let oldTop = $ax.getNumFromPx(child.css('top'));
            let oldLeft = $ax.getNumFromPx(child.css('left'));
            if (directionIn == "right") {
                child.css('left', oldLeft - width + 'px');
            } else if(directionIn == "left") {
                child.css('left', oldLeft + width + 'px');
            } else if(directionIn == "up") {
                child.css('top', oldTop + height + 'px');
            } else if(directionIn == "down") {
                child.css('top', oldTop - height + 'px');
            }
        }

        if (makePanelVisible) $ax.visibility.SetIdVisible(id, true);
        for(i = 0; i < jobj.length; i++) $ax.visibility.SetIdVisible($(jobj[i]).attr('id'), true);

        if(preserveScroll) _tryResumeScrollForDP(id);
        if(directionIn == "right") {
            $ax.move.MoveWidget(stateId, width, 0, options, false, onComplete, false, jobj);
        } else if(directionIn == "left") {
            $ax.move.MoveWidget(stateId, -width, 0, options, false, onComplete, false, jobj);
        } else if(directionIn == "up") {
            $ax.move.MoveWidget(stateId, 0, -height, options, false, onComplete, false, jobj);
        } else if(directionIn == "down") {
            $ax.move.MoveWidget(stateId, 0, height, options, false, onComplete, false, jobj);
        }
    };

    $ax.visibility.GetPanelStateId = function(dpId, index) {
        let itemNum = $ax.repeater.getItemIdFromElementId(dpId);
        let panelStateId = $ax.repeater.getScriptIdFromElementId(dpId) + '_state' + index;
        return $ax.repeater.createElementId(panelStateId, itemNum);
    };

    $ax.visibility.GetPanelStateCount = function(id) {
        return $ax.visibility.getRealChildren($jobj(id).children()).length;
    };

    let _bringPanelStateToFront = function (dpId, stateid) {
        let panel = $jobj(dpId);
        if(containerCount[dpId]) {
            stateid = $ax.visibility.applyWidgetContainer(stateid);
            panel = $ax.visibility.applyWidgetContainer(dpId, true, false, true);
        }
        $jobj(stateid).appendTo(panel);
        //when bring a panel to front, it will be focused, and the previous front panel should fire blur event if it's lastFocusedClickableSelector
        //ie(currently 11) and firefox(currently 34) doesn't fire blur event, this is the hack to fire it manually
        if((IE || FIREFOX) && window.lastFocusedClickable && $ax.event.getFocusableWidgetOrChildId(window.lastFocusedControl) == window.lastFocusedClickable.id) {
            $(window.lastFocusedClickable).triggerHandler('blur');
        }
    };

    let _limboIds = _visibility.limboIds = {};
    // limboId's is a dictionary of id->true, essentially a set.
    let _addLimboAndHiddenIds = $ax.visibility.addLimboAndHiddenIds = function(newLimboIds, newHiddenIds, query, skipRepeater) {
        let limboedByMaster = {};
        for(let key in newLimboIds) {
            if (!$ax.public.fn.IsReferenceDiagramObject($ax.getObjectFromElementId(key).type)) {
              continue;
            }
            let ids = $ax.model.idsInRdo(key);
            for(let i = 0; i < ids.length; i++) limboedByMaster[ids[i]] = true;
        }

        let hiddenByMaster = {};
        for(key in newHiddenIds) {
            if (!$ax.public.fn.IsReferenceDiagramObject($ax.getObjectFromElementId(key).type)) {
              continue;
            }
            ids = $ax.model.idsInRdo(key);
            for(i = 0; i < ids.length; i++) hiddenByMaster[ids[i]] = true;
        }

        // Extend with children of rdos
        newLimboIds = $.extend(newLimboIds, limboedByMaster);
        newHiddenIds = $.extend(newHiddenIds, hiddenByMaster);

        // something is only visible if it's not hidden and limboed

        //if(!skipSetting) {
        query.each(function(diagramObject, elementId) {
            // Rdos already handled, contained widgets are limboed by the parent, and sub menus should be ignored
            if($ax.public.fn.IsReferenceDiagramObject(diagramObject.type) || $ax.public.fn.IsTableCell(diagramObject.type) || diagramObject.isContained || $jobj(elementId).hasClass('sub_menu')) return;
            if(diagramObject.type == 'table' && $jobj(elementId).parent().hasClass('ax_menu')) return;
            if(skipRepeater) {
                // Any item in a repeater should return
                let repeater = $ax.getParentRepeaterFromElementId(elementId);
                if (repeater && repeater != elementId) return;
            }

            let scriptId = $ax.repeater.getScriptIdFromElementId(elementId);
            let shouldBeVisible = Boolean(!newLimboIds[scriptId] && !newHiddenIds[scriptId]);
            let isVisible = Boolean(_isIdVisible(elementId));
            if(shouldBeVisible != isVisible) {
                _setWidgetVisibility(elementId, { value: shouldBeVisible });
            }
        });
        //}

        _limboIds = _visibility.limboIds = $.extend(_limboIds, newLimboIds);

    };

    let _clearLimboAndHidden = $ax.visibility.clearLimboAndHidden = function(ids) {
        _limboIds = _visibility.limboIds = {};
    };

    $ax.visibility.clearLimboAndHiddenIds = function(ids) {
        for(let i = 0; i < ids.length; i++) {
            let scriptId = $ax.repeater.getScriptIdFromElementId(ids[i]);
            delete _limboIds[scriptId];
        }
    };

    $ax.visibility.resetLimboAndHiddenToDefaults = function (query) {
        if(!query) query = $ax('*');
        _clearLimboAndHidden();
        _addLimboAndHiddenIds(_defaultLimbo, _defaultHidden, query);
    };

    $ax.visibility.isScriptIdLimbo = function(scriptId) {
        if(_limboIds[scriptId]) return true;

        let repeater = $ax.getParentRepeaterFromScriptId(scriptId);
        if(!repeater) return false;

        let itemId = $ax.getItemIdsForRepeater(repeater)[0];
        return _limboIds[$ax.repeater.createElementId(scriptId, itemId)];
    }

    $ax.visibility.initialize = function() {
        // initialize initial visible states
        $('.' + HIDDEN_CLASS).each(function (index, diagramObject) {
            _defaultHidden[$ax.repeater.getScriptIdFromElementId(diagramObject.id)] = true;
        });

        $('.' + UNPLACED_CLASS).each(function (index, diagramObject) {
            _defaultLimbo[$ax.repeater.getScriptIdFromElementId(diagramObject.id)] = true;
        });

        _addLimboAndHiddenIds(_defaultLimbo, _defaultHidden, $ax('*'), true);
    };

    _visibility.initRepeater = function(repeaterId) {
        let html = $('<div></div>');
        html.append($jobj(repeaterId + '_script').html());

        html.find('.' + HIDDEN_CLASS).each(function (index, element) {
            _defaultHidden[$ax.repeater.getScriptIdFromElementId(element.id)] = true;
        });

        html.find('.' + UNPLACED_CLASS).each(function (index, element) {
            _defaultLimbo[$ax.repeater.getScriptIdFromElementId(element.id)] = true;
        });
    }

    let HIDDEN_CLASS = _visibility.HIDDEN_CLASS = 'ax_default_hidden';
    let UNPLACED_CLASS = _visibility.UNPLACED_CLASS = 'ax_default_unplaced';

});
