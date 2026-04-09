#include<stdio.h>

int main() {
    int a[25], b[25], j;

    printf("Enter 25 numbers:\n");
    for(j = 0; j < 25; j++) {
        scanf("%d", &a[j]);
    }

    // Corrected: Copy from 'a' (source) to 'b' (destination)
    for(j = 0; j < 25; j++) {
        b[j] = a[j]; 
    }

    for(j = 0; j < 25; j++) {
        printf("First array: %d | ", a[j]);
        printf("Second array: %d\n", b[j]);
    }

    return 0;
}