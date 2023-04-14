import React from "react";
import "./header2.css";
const Header2 = () => {
    return (
        <div id="nav-belt">
            <div className="nav-left">
                <div id="nav-logo">
                    <a
                        href="/ref=nav_logo"
                        id="nav-logo-sprites"
                        className="nav-logo-link nav-progressive-attribute"
                        aria-label="Amazon"
                    >
                        <span className="nav-sprite nav-logo-base"></span>
                        <span
                            id="logo-ext"
                            className="nav-sprite nav-logo-ext nav-progressive-content"
                        ></span>
                        <span className="nav-logo-locale">.us</span>
                    </a>
                </div>

                <div id="nav-global-location-slot">
                    <span
                        id="nav-global-location-data-modal-action"
                        className="a-declarative nav-progressive-attribute"
                        data-a-modal='{"width":375, "closeButton":"false","popoverLabel":"Choose your location", "ajaxHeaders":{"anti-csrftoken-a2z":"gC7uOFq6GdSZDgu68a6TKcoG4FAiFGcdZzqtWq4AAAAMAAAAAGQ2SPByYXcAAAAA;hKOmF69zcXpnnCeCyqBEyqyAfJsQR3fGl7m04sTwRYQpAAAAAGQ2SPAAAAAB"}, "name":"glow-modal", "url":"/portal-migration/hz/glow/get-rendered-address-selections?deviceType=desktop&amp;pageType=Search&amp;storeContext=NoStoreName&amp;actionSource=desktop-modal", "footer":"<span class=\"a-declarative\" data-action=\"a-popover-close\" data-a-popover-close=\"{}\"><span class=\"a-button a-button-primary\"><span class=\"a-button-inner\"><button name=\"glowDoneButton\" class=\"a-button-text\" type=\"button\">Done</button></span></span></span>","header":"Choose your location"}'
                        data-action="a-modal"
                    >
                        <a
                            id="nav-global-location-popover-link"
                            className="nav-a nav-a-2 a-popover-trigger a-declarative nav-progressive-attribute"
                            tabindex="0"
                        >
                            <div
                                className="nav-sprite nav-progressive-attribute"
                                id="nav-packard-glow-loc-icon"
                            ></div>
                            <div id="glow-ingress-block">
                                <span
                                    className="nav-line-1 nav-progressive-content"
                                    id="glow-ingress-line1"
                                >
                                    Deliver to
                                </span>
                                <span
                                    className="nav-line-2 nav-progressive-content"
                                    id="glow-ingress-line2"
                                >
                                    Pakistan
                                </span>
                            </div>
                        </a>
                    </span>
                    <input
                        data-addnewaddress="add-new"
                        id="unifiedLocation1ClickAddress"
                        name="dropdown-selection"
                        type="hidden"
                        value="add-new"
                        className="nav-progressive-attribute"
                    />
                    <input
                        data-addnewaddress="add-new"
                        id="ubbShipTo"
                        name="dropdown-selection-ubb"
                        type="hidden"
                        value="add-new"
                        className="nav-progressive-attribute"
                    />
                    <input
                        id="glowValidationToken"
                        name="glow-validation-token"
                        type="hidden"
                        value="gC7uOFq6GdSZDgu68a6TKcoG4FAiFGcdZzqtWq4AAAAMAAAAAGQ2SPByYXcAAAAA;hKOmF69zcXpnnCeCyqBEyqyAfJsQR3fGl7m04sTwRYQpAAAAAGQ2SPAAAAAB"
                        className="nav-progressive-attribute"
                    />
                </div>

                <div
                    id="nav-global-location-toaster-script-container"
                    className="nav-progressive-content"
                ></div>
            </div>
            <div className="nav-fill">
                <div id="nav-search">
                    <div id="nav-bar-left"></div>
                    <form
                        id="nav-search-bar-form"
                        accept-charset="utf-8"
                        action="/s/ref=nb_sb_noss_1"
                        className="nav-searchbar nav-progressive-attribute"
                        method="GET"
                        name="site-search"
                        role="search"
                    >
                        <div className="nav-left">
                            <div id="nav-search-dropdown-card">
                                <div className="nav-search-scope nav-sprite">
                                    <div
                                        className="nav-search-facade"
                                        data-value="search-alias=aps"
                                    >
                                        <span
                                            id="nav-search-label-id"
                                            className="nav-search-label nav-progressive-content"
                                        >
                                            All
                                        </span>
                                        <i className="nav-icon"></i>
                                    </div>
                                    <label
                                        id="searchDropdownDescription"
                                        for="searchDropdownBox"
                                        className="nav-progressive-attribute"
                                    >
                                        Select the department you want to search
                                        in
                                    </label>
                                    <select
                                        aria-describedby="searchDropdownDescription"
                                        className="nav-search-dropdown searchSelect nav-progressive-attrubute nav-progressive-search-dropdown"
                                        data-nav-digest="k+fyIAyB82R9jVEmroQ0OWwSW3A="
                                        data-nav-selected="0"
                                        id="searchDropdownBox"
                                        name="url"
                                        tabindex="0"
                                        title="Search in"
                                    >
                                        <option
                                            selected="selected"
                                            value="search-alias=aps"
                                        >
                                            All Departments
                                        </option>
                                        <option value="search-alias=arts-crafts-intl-ship">
                                            Arts &amp; Crafts
                                        </option>
                                        <option value="search-alias=automotive-intl-ship">
                                            Automotive
                                        </option>
                                        <option value="search-alias=baby-products-intl-ship">
                                            Baby
                                        </option>
                                        <option value="search-alias=beauty-intl-ship">
                                            Beauty &amp; Personal Care
                                        </option>
                                        <option value="search-alias=stripbooks-intl-ship">
                                            Books
                                        </option>
                                        <option value="search-alias=fashion-boys-intl-ship">
                                            Boys' Fashion
                                        </option>
                                        <option value="search-alias=computers-intl-ship">
                                            Computers
                                        </option>
                                        <option value="search-alias=deals-intl-ship">
                                            Deals
                                        </option>
                                        <option value="search-alias=digital-music">
                                            Digital Music
                                        </option>
                                        <option value="search-alias=electronics-intl-ship">
                                            Electronics
                                        </option>
                                        <option value="search-alias=fashion-girls-intl-ship">
                                            Girls' Fashion
                                        </option>
                                        <option value="search-alias=hpc-intl-ship">
                                            Health &amp; Household
                                        </option>
                                        <option value="search-alias=kitchen-intl-ship">
                                            Home &amp; Kitchen
                                        </option>
                                        <option value="search-alias=industrial-intl-ship">
                                            Industrial &amp; Scientific
                                        </option>
                                        <option value="search-alias=digital-text">
                                            Kindle Store
                                        </option>
                                        <option value="search-alias=luggage-intl-ship">
                                            Luggage
                                        </option>
                                        <option value="search-alias=fashion-mens-intl-ship">
                                            Men's Fashion
                                        </option>
                                        <option value="search-alias=movies-tv-intl-ship">
                                            Movies &amp; TV
                                        </option>
                                        <option value="search-alias=music-intl-ship">
                                            Music, CDs &amp; Vinyl
                                        </option>
                                        <option value="search-alias=pets-intl-ship">
                                            Pet Supplies
                                        </option>
                                        <option value="search-alias=instant-video">
                                            Prime Video
                                        </option>
                                        <option value="search-alias=software-intl-ship">
                                            Software
                                        </option>
                                        <option value="search-alias=sporting-intl-ship">
                                            Sports &amp; Outdoors
                                        </option>
                                        <option value="search-alias=tools-intl-ship">
                                            Tools &amp; Home Improvement
                                        </option>
                                        <option value="search-alias=toys-and-games-intl-ship">
                                            Toys &amp; Games
                                        </option>
                                        <option value="search-alias=videogames-intl-ship">
                                            Video Games
                                        </option>
                                        <option value="search-alias=fashion-womens-intl-ship">
                                            Women's Fashion
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="nav-fill">
                        <div className="nav-search-field ">
                            <label for="twotabsearchtextbox">
                                Search Amazon
                            </label>
                            <input
                                type="text"
                                id="twotabsearchtextbox"
                                value="react js"
                                name="field-keywords"
                                autocomplete="off"
                                placeholder="Search Amazon"
                                className="nav-input nav-progressive-attribute"
                                dir="auto"
                                tabindex="0"
                                aria-label="Search Amazon"
                                spellcheck="false"
                            />
                        </div>
                        <div id="nav-iss-attach"></div>
                    </div>
                    <div className="nav-right">
                        <div className="nav-search-submit nav-sprite">
                            <span
                                id="nav-search-submit-text"
                                className="nav-search-submit-text nav-sprite nav-progressive-attribute"
                                aria-label="Go"
                            >
                                <input
                                    id="nav-search-submit-button"
                                    type="submit"
                                    className="nav-input nav-progressive-attribute"
                                    value="Go"
                                    tabindex="0"
                                />
                            </span>
                        </div>
                    </div>
                    <input
                        type="hidden"
                        id="isscrid"
                        name="crid"
                        value="3OHGTK5D59PTO"
                    />
                    <input
                        type="hidden"
                        id="issprefix"
                        name="sprefix"
                        value="react js,aps,651"
                    />
                </div>
            </div>
            <div className="nav-right">
                <div id="nav-tools" className="layoutToolbarPadding">
                    <a
                        href="/customer-preferences/edit?ie=UTF8&amp;preferencesReturnUrl=%2Fs%3Fk%3Dreact%2Bjs%26adgrpid%3D88851447263%26hvadid%3D412183540502%26hvdev%3Dc%26hvlocphy%3D1011080%26hvnetw%3Dg%26hvqmt%3Db%26hvrand%3D12294380305804862393%26hvtargid%3Dkwd-59168200696%26hydadcr%3D10787_11117245%26tag%3Dhydglogoo-20%26ref%3Dpd_sl_5c7tw470ce_b&amp;ref_=topnav_lang_ais"
                        id="icp-nav-flyout"
                        className="nav-a nav-a-2 icp-link-style-2"
                        aria-label="Choose a language for shopping."
                    >
                        <span className="icp-nav-link-inner">
                            <span className="nav-line-1"></span>
                            <span className="nav-line-2">
                                <span className="icp-nav-flag icp-nav-flag-us icp-nav-flag-lop"></span>
                                <div>EN</div>
                                <span className="nav-icon nav-arrow"></span>
                            </span>
                        </span>
                    </a>

                    <a
                        href="https://www.amazon.com/ap/signin?openid.pape.max_auth_age=0&amp;openid.return_to=https%3A%2F%2Fwww.amazon.com%2Fs%3Fk%3Dreact%2Bjs%26adgrpid%3D88851447263%26hvadid%3D412183540502%26hvdev%3Dc%26hvlocphy%3D1011080%26hvnetw%3Dg%26hvqmt%3Db%26hvrand%3D12294380305804862393%26hvtargid%3Dkwd-59168200696%26hydadcr%3D10787_11117245%26tag%3Dhydglogoo-20%26ref%3Dnav_ya_signin&amp;openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&amp;openid.assoc_handle=usflex&amp;openid.mode=checkid_setup&amp;openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&amp;openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&amp;"
                        className="nav-a nav-a-2   nav-progressive-attribute"
                        data-nav-ref="nav_ya_signin"
                        data-nav-role="signin"
                        data-ux-jq-mouseenter="true"
                        id="nav-link-accountList"
                        tabindex="0"
                        data-csa-c-type="link"
                        data-csa-c-slot-id="nav-link-accountList"
                        data-csa-c-content-id="nav_ya_signin"
                        data-csa-c-id="6usydn-eyz79s-89l9i8-qwuvzk"
                    >
                        <div className="nav-line-1-container">
                            <span
                                id="nav-link-accountList-nav-line-1"
                                className="nav-line-1 nav-progressive-content"
                            >
                                Hello, sign in
                            </span>
                        </div>
                        <span className="nav-line-2 ">
                            Account &amp; Lists
                            <span className="nav-icon nav-arrow"></span>
                        </span>
                    </a>

                    <a
                        href="/gp/css/order-history?ref_=nav_orders_first"
                        className="nav-a nav-a-2   nav-progressive-attribute"
                        id="nav-orders"
                        tabindex="0"
                    >
                        <span className="nav-line-1">Returns</span>
                        <span className="nav-line-2">
                            &amp; Orders
                            <span className="nav-icon nav-arrow"></span>
                        </span>
                    </a>

                    <a
                        href="/gp/cart/view.html?ref_=nav_cart"
                        aria-label="0 items in cart"
                        className="nav-a nav-a-2 nav-progressive-attribute"
                        id="nav-cart"
                    >
                        <div id="nav-cart-count-container">
                            <span
                                id="nav-cart-count"
                                aria-hidden="true"
                                className="nav-cart-count nav-cart-0 nav-progressive-attribute nav-progressive-content"
                            >
                                0
                            </span>
                            <span className="nav-cart-icon nav-sprite"></span>
                        </div>
                        <div
                            id="nav-cart-text-container"
                            className=" nav-progressive-attribute"
                        >
                            <span
                                aria-hidden="true"
                                className="nav-line-1"
                            ></span>
                            <span aria-hidden="true" className="nav-line-2">
                                Cart
                                <span className="nav-icon nav-arrow"></span>
                            </span>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    );
};
export default Header2;
