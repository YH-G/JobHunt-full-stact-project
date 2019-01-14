
export function getRedirectPath({type, avatar}) {
    let url = (type === 'company') ? '/dashboard/company': '/dashboard/applicant'
    if (!avatar) {
        url += 'info'
        url = url.slice(10)
    }
    return url
}

export function getChatId(userId,  targetId) {
    return [userId, targetId].sort().join('_')
}