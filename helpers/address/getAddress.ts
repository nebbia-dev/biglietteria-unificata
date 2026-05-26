export default function getAddress(address?: string) {
    if (!address) {
        return 'Cremona';
    }

    const arr = address.split(', ');

    if (arr.length < 3) {
        return address;
    }

    return arr[1] + ', ' + arr[2];
}
