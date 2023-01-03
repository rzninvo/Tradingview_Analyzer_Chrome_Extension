function getCurrencyImage() {
    let currency_image = document.getElementsByClassName('tv-circle-logo tv-circle-logo--xlarge tv-category-header__icon');
    let currency_name = document.getElementsByClassName('tv-symbol-header__first-line');
    let currency_symbol = document.getElementsByClassName('tv-symbol-header__second-line--text');
    let currency_exchange_icon = document.getElementsByClassName('tv-circle-logo tv-circle-logo--xxsmall tv-symbol-header__exchange-logo');
    let currency_exchange = document.getElementsByClassName('tv-symbol-header__exchange');
    let ideas = document.getElementsByClassName('tv-feed__item tv-feed-layout__card-item js-feed__item--inited');
    return [currency_image[0].src, currency_name[0].innerHTML, currency_symbol[0].innerHTML, 
            currency_exchange_icon[0].src, currency_exchange[0].innerHTML];
}

function getLivePrice(){
    let live_price_constant = document.getElementsByClassName('tv-sticky-symbol-header-item__last js-symbol-last');
    let live_price_falling = document.getElementsByClassName('tv-sticky-symbol-header-item__last--falling');
    let live_price_growing = document.getElementsByClassName('tv-sticky-symbol-header-item__last--growing');
    let live_price_symbol = document.getElementsByClassName('tv-sticky-symbol-header-item__currency js-symbol-currency');
    let live_price_direction = document.getElementsByClassName('js-symbol-change tv-symbol-price-quote__change-value');
    let live_price_direction_pt = document.getElementsByClassName('js-symbol-change-pt tv-symbol-price-quote__change-value');
    let live_price_market = document.getElementsByClassName("tv-symbol-price-quote__sub-line");
    let live_market_details = document.getElementsByClassName('tv-category-header__fundamentals js-header-fundamentals quote-ticker-inited');
    if (live_price_falling.length == 1)
        if (live_market_details.length == 1)
            return [live_price_constant[0].innerHTML, live_price_falling[0].innerHTML, 0, live_price_symbol[0].innerHTML
                    , live_price_direction[0].innerHTML, live_price_direction_pt[0].innerHTML, live_price_market[0].innerHTML
                    , live_market_details[0].innerHTML];
        else
            return [live_price_constant[0].innerHTML, live_price_falling[0].innerHTML, 0, live_price_symbol[0].innerHTML
                    , live_price_direction[0].innerHTML, live_price_direction_pt[0].innerHTML, live_price_market[0].innerHTML
                    , null];
    else if (live_price_growing.length == 1)
        if (live_market_details.length == 1)
            return [live_price_constant[0].innerHTML, live_price_growing[0].innerHTML, 1, live_price_symbol[0].innerHTML
                    , live_price_direction[0].innerHTML, live_price_direction_pt[0].innerHTML, live_price_market[0].innerHTML
                    , live_market_details[0].innerHTML];
        else
            return [live_price_constant[0].innerHTML, live_price_growing[0].innerHTML, 1, live_price_symbol[0].innerHTML
                    , live_price_direction[0].innerHTML, live_price_direction_pt[0].innerHTML, live_price_market[0].innerHTML
                    , null];
    else
        if (live_market_details.length == 1)
            return [live_price_constant[0].innerHTML, null, 2, live_price_symbol[0].innerHTML
                    , live_price_direction[0].innerHTML, live_price_direction_pt[0].innerHTML, live_price_market[0].innerHTML
                    , live_market_details[0].innerHTML];
        else
            return [live_price_constant[0].innerHTML, null, 2, live_price_symbol[0].innerHTML
                    , live_price_direction[0].innerHTML, live_price_direction_pt[0].innerHTML, live_price_market[0].innerHTML
                    , null];
}

window.onload = setTimeout(async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    let analytics_panel = document.getElementById("apanel");
    let coin_panel = document.getElementById("cpanel");
    let idea_analysis_panel = document.querySelector('.idea-analysis-panel');
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: getCurrencyImage,
      }, (result) => {
        let currency_image_div = document.createElement('div');
        currency_image_div.classList.add("currency-image-div");
        let currency_image = document.createElement('img');
        currency_image.classList.add("currency-image");
        let symbol_header = document.createElement('div');
        symbol_header.classList.add("symbol-header");
        let currency_name = document.createElement('h1');
        currency_name.classList.add("currency-name");
        let currency_symbol_header = document.createElement('span');
        currency_symbol_header.classList.add("currency-symbol-header");
        let currency_symbol = document.createElement('span');
        currency_symbol.classList.add("currency-symbol");
        let currency_exchange_icon = document.createElement('img');
        currency_exchange_icon.classList.add("currency-exchange-icon");
        let currency_exchange = document.createElement('span');
        currency_exchange.classList.add("currency-exchange");
        for (const frameResult of result){
            currency_image.src = frameResult.result[0];
            currency_image.alt = frameResult.result[0];
            currency_name.innerHTML = frameResult.result[1];
            currency_symbol.innerHTML = frameResult.result[2];
            currency_exchange_icon.src = frameResult.result[3];
            currency_exchange_icon.alt = frameResult.result[3];
            currency_exchange.innerHTML = frameResult.result[4];
        }
        let fodder_index = currency_name.innerHTML.indexOf("<span");
        let fodder_string = currency_name.innerHTML.substring(fodder_index);
        currency_name.innerHTML = (currency_name.innerHTML.replace(fodder_string, "")).toUpperCase();
        let parent_div = document.getElementById('curdet');
        currency_image_div.append(currency_image);
        symbol_header.append(currency_name);
        currency_symbol_header.append(currency_symbol);
        currency_symbol_header.append(currency_exchange_icon);
        currency_symbol_header.append(currency_exchange);
        symbol_header.append(currency_symbol_header);
        parent_div.append(currency_image_div);
        parent_div.append(symbol_header);
        setTimeout( () => {
            analytics_panel.style.visibility = "visible";
            analytics_panel.style.opacity = "1";
            coin_panel.style.visibility = "visible";
            coin_panel.style.opacity = "1";
            parent_div.style.visibility = "visible";
            parent_div.style.opacity = "1";
            }, 500);
      });
      let live_price_div = document.createElement('div');
      live_price_div.classList.add("live-price-div");
      let live_price_constant = document.createElement('span');
      live_price_constant.classList.add("live-price-constant");
      let live_price_variable = document.createElement('span');
      live_price_variable.classList.add("live-price-variable");
      let live_price_symbol = document.createElement('span');
      live_price_symbol.classList.add("live-price-symbol");
      let live_price_direction_box = document.createElement('div');
      live_price_direction_box.classList.add('live-price-direction-box');
      let live_price_direction = document.createElement('span');
      live_price_direction.classList.add('live-price-direction');
      let live_price_direction_pt = document.createElement('span');
      live_price_direction_pt.classList.add('live-price-direction-pt');
      let live_price_market = document.createElement('div');
      live_price_market.classList.add('live-price-market');
      let live_market_details = document.createElement('div');
      live_market_details.classList.add('live-market-details');
      let live_price = document.getElementById('liveprice');
      let flag = 2;
      live_price.append(live_price_div);
      live_price.append(live_price_direction_box);
      analytics_panel.append(live_price_market);
      analytics_panel.append(live_market_details);
      setInterval(async () => {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: getLivePrice,
        }, (result) => {
                for (const frameResult of result){
                    console.log(frameResult.result);
                    live_price_constant.innerHTML = frameResult.result[0];
                    live_price_variable.innerHTML = frameResult.result[1];
                    flag = frameResult.result[2];
                    live_price_symbol.innerHTML = frameResult.result[3];
                    live_price_direction.innerHTML = frameResult.result[4];
                    live_price_direction_pt.innerHTML = frameResult.result[5];
                    live_price_market.innerHTML = frameResult.result[6];
                    live_market_details.innerHTML = frameResult.result[7];
                }
                if (flag != 2){
                    let fodder_index = live_price_constant.innerHTML.indexOf("<span");
                    let fodder_string = live_price_constant.innerHTML.substring(fodder_index);
                    live_price_constant.innerHTML = live_price_constant.innerHTML.replace(fodder_string, "");
                    if (flag == 0){
                        live_price_variable.classList.add("price_falling");
                        live_price_variable.classList.remove("price_growing");
                    }
                    else{
                        live_price_variable.classList.add("price_growing");
                        live_price_variable.classList.remove("price_falling");
                    }
                }
                if (live_price_direction.innerHTML[0] == '+'){
                    live_price_direction.classList.add("price_growing");
                    live_price_direction.classList.remove("price_falling");
                }
                else{
                    live_price_direction.classList.add("price_falling");
                    live_price_direction.classList.remove("price_growing");
                }
                if (live_price_direction_pt.innerHTML.includes("(+")){
                    live_price_direction_pt.classList.add("price_growing");
                    live_price_direction_pt.classList.remove("price_falling");
                }
                else{
                    live_price_direction_pt.classList.add("price_falling");
                    live_price_direction_pt.classList.remove("price_growing");
                }
                live_price_direction_box.append(live_price_direction);
                live_price_direction_box.append(live_price_direction_pt);
                live_price_constant.append(live_price_variable);
                live_price_div.append(live_price_constant);
                live_price_div.append(live_price_symbol);
            });
        }, 100);
        setTimeout( () => {
            live_price.style.visibility = "visible";
            live_price.style.opacity = "1";
        }, 2000);
        setTimeout( () => {
            live_price_market.style.visibility = "visible";
            live_price_market.style.opacity = "1";
            live_market_details.style.visibility = "visible";
            live_market_details.style.opacity = "1";
        }, 3000);
        setTimeout( () => {
            idea_analysis_panel.style.visibility = "visible";
            idea_analysis_panel.style.opacity = "1";
            let circle = document.querySelector('.circle');
            circle.style.animation = 'progress 1s ease-out forwards';
        }, 4000);
}, 1000);