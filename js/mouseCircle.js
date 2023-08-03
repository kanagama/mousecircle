/**
 * @var {String}
 */
const toggle_params = 'mouse_toggle';

export class MouseCircle
{
    /**
     * @var {HTMLElement}
     */
    #circleDiv;

    /**
     *
     */
    constructor()
    {
        if (this.has()) {
            return;
        }

        this.#circleDiv = document.createElement('div');
        this.#circleDiv.classList.add('mousecircle', 'circlehide');

        document.body.appendChild(this.#circleDiv);
    }

    /**
     * 要素の存在チェック
     *
     * @returns {Boolean}
     */
    has()
    {
        const existingCircleDiv = document.querySelector("div.mousecircle");
        return Boolean(existingCircleDiv);
    }

    /**
     * @returns {Boolean}
     */
    getStrage()
    {
        chrome.storage.local.get([toggle_params], (result) => {
            if (result.toggle) {
                toggle();
            }
            console.log('loaded this toggle_params.');
        });

        return true;
    }

    /**
     * @param {Boolean} bool
     * @returns {Boolean}
     */
    setStorage(bool)
    {
        const value = { [toggle_params] : bool };
        chrome.storage.local.set(value, () => {
          console.log('saved this toggle_params.');
        });

        return true;
    }

    /**
     * 要素の移動
     *
     * @param {Number} x
     * @param {Number} y
     */
    move(x, y)
    {
        if (isNaN(x) || isNaN(y)) {
            return false;
        }
        if (this.has() === false) {
            return false;
        }

        this.#circleDiv.css({
            "top": y + "px",
            "left": x + "px",
        });

        return true;
    }

    /**
     * 表示トグル
     *
     * @returns {Boolean}
     */
    toggle()
    {
        if (this.has() === false) {
            return false;
        }

        this.#circleDiv.toggleClass('circlehide');
        this.setStorage(this.#circleDiv.hasClass('circlehide'));

        return true;
    }

    /**
     * クリックトグル
     *
     * @returns {Boolean}
     */
    click()
    {
        if (this.has() === false) {
            return false;
        }

        this.#circleDiv.toggleClass('mousecircleclick');

        return true;
    }
}
