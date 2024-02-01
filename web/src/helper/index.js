export const request = async (method, url, data) => {
    try {
        const res = await fetch('http://localhost:3000/api'+url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return res.json();
    } catch (error) {
        console.log(error)
    }
}