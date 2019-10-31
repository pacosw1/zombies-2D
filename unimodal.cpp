#include <iostream>
#include <algorithm>
using namespace std;

/*


cases
1. increase -> constant -> decrease
2. increase -> constant
3  constant
4. constant ->decrease


edge cases
1. if n = 1, constant
2. two numms needed for a valid sequence.

*/

int main()
{
    int n, curr;
    cin << n;
    vector<int> input;
    for (int i = 0; i < n; i++)
    {
        cin >> curr;
        input.push_back(curr);
    }
    vector<int> inc;
    vector<int> dec;
    vector<int> con;
    int curr, prev;
    prev = input[0];
    for (int i = 1; i < input.length(); i++)
    {
        curr = input[i];
        if (curr == prev)
            con.push_back(i);
        else if (curr > prev)
            inc.push_back(i);
        else
            dec.push_back(i);
        prev = curr;
    }

    sort(inc.begin(), inc.end());
    sort(con.begin(), con.end());
    sort(dec.begin(), dec.end());

    if (!inc.empty() && !con.empty() && !dec.empty())
    {
        if (inc[inc.size() - 1] < con[0] && con[con.size() - 1] < dec[0])
        {
            cout << "YES";
        }
        else
            cout << "NO";
    }
    else if (!inc.empty() && dec.empty() && !con.empty())
    {
        if (inc[inc.size() - 1] < con[0])
        {
            cout << "YES";
        }
        else
            cout << "NO";
    }
    else if (inc.empty() && dec.empty() && !con.empty())
    {
        cout << "YES";
    }
    else if (!con.empty() && !dec.empty())
    {
        if (con[con.size() - 1] < dec[0])
        {
            cout << "YES";
        }
        else
        {
            cout << "NO";
        }
    }
    return 0;
}