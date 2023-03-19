const baseUrl = "https://frontend-test-assignment-api.abz.agency/api/v1/"

type Controller = "users" | "token" | "positions"

export const getQuery = async (controller: Controller, page?: number, count?: number) => {

    const params = page && count
        ? new URLSearchParams({
            page: page.toString(),
            count: count.toString()
        })
        : ""

    try {
        const response = await fetch(baseUrl + controller + '?' + params, {
            method: "GET",
        })
        return await response.json()
    } catch (e) {
        console.error(e)
    }
}

export const postQuery = async (token: string, formData: FormData) => {
    try {
        const response = await fetch(baseUrl + "users/", {
            method: "POST",
            headers: {
                'Token': token,
            },
            body: formData
        })

        return await response.json()

    } catch (e) {
        console.error(e)
    }
}