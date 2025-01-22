

const pageConfig = {
    '/': { title: 'Home', content: '<h1>Welcome to Home</h1><button onclick="navigateTo(\'/l1\')">Go to L1</button>' },
    '/l1': { title: 'Home L1', content: '<h1>Home - L1 Page</h1><button onclick="navigateTo(\'/l2\')">Go to L2</button>' },
    '/l2': { title: 'Home L2', content: '<h1>Home - L2 Page</h1><button onclick="navigateTo(\'/\')">Go to Home</button>' },
    '/categories': { title: 'Categories', content: '<h1>Welcome to Categories</h1><button onclick="navigateTo(\'/categories/l1\')">Go to L1</button>' },
    '/categories/l1': { title: 'Categories L1', content: '<h1>Categories - L1 Page</h1><button onclick="navigateTo(\'/categories/l2\')">Go to L2</button><button onclick="navigateTo(\'/categories/l3\')">Go to L3</button>' },
    '/categories/l2': { title: 'Categories L2', content: '<h1>Categories - L2 Page</h1><button onclick="navigateTo(\'/categories\')">Go to Categories</button>' },
    '/categories/l3': { title: 'Categories L3', content: '<h1>Categories - L3 Page</h1><button onclick="navigateTo(\'/categories/l3\')">Go to L3</button>' },
    '/cart': { title: 'Cart', content: '<h1>Welcome to Cart</h1><button onclick="navigateTo(\'/cart/l1\')">Go to L1</button>' },
    '/cart/l1': { title: 'Cart L1', content: '<h1>Cart - L1 Page</h1><button onclick="navigateTo(\'/cart/l2\')">Go to L2</button>' },
    '/cart/l2': { title: 'Cart L2', content: '<h1>Cart - L2 Page</h1><button onclick="navigateTo(\'/cart\')">Go to Cart</button>' },
    '/404': { title: '404', content: '<h1>404 - Page Not Found</h1>' },
};
const content = document.getElementById('content');
const historyList = document.getElementById('historyList');
const contentDiv = document.getElementById('content');
const bottomNav = document.querySelector('.bottom-nav');
const tabs = document.querySelectorAll('.tab');

const navigationHistory = { home: ['/'], categories: ['/categories'], cart: ['/cart'] };


let currentTab = 'home';


function getTabFromPath(path) {
    if (path.startsWith('/categories')) return 'categories';
    if (path.startsWith('/cart')) return 'cart';
    return 'home'; // Default to home
}


function updateNavigationHistory(path, action = 'add') {
    const tab = getTabFromPath(path);
    if(!tab) return;

    if (action === 'add') {
        navigationHistory[tab].push(path);
    } else if (action === 'remove') {
        navigationHistory[tab].pop();
    }
    console.log('updated navigation history:', navigationHistory);

}


function navigateTo(path) {
    const targetTab = getTabFromPath(path);

    const lastVisitedPageOfTargetTab = navigationHistory[targetTab][navigationHistory[targetTab].length - 1];

    // find the last active tab
    // If switching tabs, navigate to the last visited page of the target tab
    if (targetTab !== currentTab) {
        console.log('switching tabs, the last visited page of the target tab is ', lastVisitedPageOfTargetTab)

        history.replaceState({ path: lastVisitedPageOfTargetTab }, '', lastVisitedPageOfTargetTab);
        updateContent(lastVisitedPageOfTargetTab);
        currentTab = targetTab;
        return;
    }

    console.log('normal navigation navigating to path', path);
    history.replaceState({ path }, '', path);
    updateNavigationHistory(path, 'add');
    updateContent(path);
}
function displayDataInline(obj) {
    const navigationHistoryHeader = document.createElement('h4');
    navigationHistoryHeader.className = 'header'
    navigationHistoryHeader.innerHTML = 'custom bottomtab navigation history object';
    content.appendChild(navigationHistoryHeader);
    Object.entries(obj).forEach(([key, urls]) => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'entry';

        const keySpan = document.createElement('span');
        keySpan.className = 'key';
        keySpan.textContent = `${key}:`;

        const valueSpan = document.createElement('span');
        valueSpan.textContent = "[" + urls.map((url) => `'${url}'`).join(', ') + "]";

        entryDiv.appendChild(keySpan);
        entryDiv.appendChild(valueSpan);
        content.appendChild(entryDiv);
    });
}

function updateContent(path) {
    console.log('show content of target path', path);

    const config = pageConfig[path];
    if (config) {
        contentDiv.innerHTML = config.content;
        document.title = config.title;
        // update the tab design
        tabs.forEach(tab => {
            if (path.startsWith(tab.dataset.path)) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });
    } else {
        contentDiv.innerHTML = '<h1>404 - Page Not Found</h1>';
        document.title = '404';
    }
    const urls = navigation.entries().map(entry => entry.url);
    console.log(urls);
    historyList.innerHTML = '<h3 class="header">Browsers navigation history entries</h3>';
    urls.forEach(url => {
        const listItem = document.createElement('li');
        listItem.textContent = url;
        historyList.appendChild(listItem);
    });
    contentDiv.appendChild(historyList);
    displayDataInline(navigationHistory)
}


window.addEventListener("popstate", function (event) {
    // find a workaround to know below is triggered only for back event
    const currentTabEntries = navigationHistory[currentTab];
    if(currentTabEntries.length === 1) {
        // if current is home tab then exit the webapp
        // if current is not home tab, take user to previous tab journey
        return;
    }
    navigationHistory[currentTab].pop();
    const nextPath  = navigationHistory[currentTab][navigationHistory[currentTab].length - 1];
    console.log('nextPath', nextPath);
    history.pushState({path: nextPath}, '', nextPath);
    // trying since pointer is not moving to next state after doing history.pushState
    history.go(1);

    console.log(currentTabEntries)
    updateContent(nextPath);

    // currentTab = tab;
})

function handleTabClick(event) {

    const tab = event.target.closest('.tab');
    console.log(tab);
    if (tab && tab.dataset.path) {
        navigateTo(tab.dataset.path);
    }
}

bottomNav.addEventListener('click', handleTabClick);

window.onload = function () {
    history.pushState(null, '', '/');
  updateContent('/');
}

