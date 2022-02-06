export default async function fetchT(source, timeout, options){
    const controller = new AbortController();

    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(source, {
        ...options,
        timeout,
        signal: controller.signal  
    })
    clearTimeout(id);

    return response;
}