async function fetchData() {
    let offset = 0;

    while (true) {
        const response = await fetch(`https://api.shopware.com/pluginStore/plugins?locale=de-DE&shopwareVersion=6.5.3.0&limit=100&offset=${offset}`)
        const json = await response.json()

        if (json.data.length === 0) {
            break;
        }

        for (const plugin of json.data) {
            const id = plugin.id

            const json = JSON.stringify(plugin);

            await Deno.writeTextFile(`./data/${id}.json`, json)
        }

        offset += 100;

        console.log(`Fetched ${offset} plugins`)

        await new Promise(resolve => setTimeout(resolve, 1000))
    }
}

fetchData().then(() => console.log("done"))