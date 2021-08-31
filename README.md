
## React search component
React search component make with SASS & react-icons-kit package  

| Props         | Type     | Required |
| ------------- | -------- | -------- |
| placeholder   | String   | No  |
| searchLoading | Boolean  | Yes |
| search        | Function | Yes |
| suggestion    | Function return an Object. | Yes |                  
| clear | Function call re-fetch data. | Yes |

Returned object from suggestion props are given below:

```
const data = {
    results: [],
    message: null
}
```