const api = 'http://localhost:3001/api/';

export const getHotels = async (id?: string) => {
    const data = await fetch(api + (id ? 'hotel/' + id : 'hotels')).then(
        (data) => data.json()
    );

    return data;
};
